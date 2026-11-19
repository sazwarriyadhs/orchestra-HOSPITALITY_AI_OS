package database

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io/fs"
	"log/slog"
	"path"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	migrationLockKey1 = int32(20261118)
	migrationLockKey2 = int32(1)
)

type migration struct {
	Version  int64
	Filename string
	SQL      string
	Checksum string
}

func Run(ctx context.Context, pool *pgxpool.Pool) error {
	conn, err := pool.Acquire(ctx)
	if err != nil {
		return fmt.Errorf("acquire migration connection: %w", err)
	}
	defer conn.Release()

	if _, err := conn.Exec(
		ctx,
		"SELECT pg_advisory_lock($1, $2)",
		migrationLockKey1,
		migrationLockKey2,
	); err != nil {
		return fmt.Errorf("acquire migration lock: %w", err)
	}

	defer func() {
		unlockCtx, cancel := context.WithTimeout(
			context.Background(),
			5*time.Second,
		)
		defer cancel()

		if _, err := conn.Exec(
			unlockCtx,
			"SELECT pg_advisory_unlock($1, $2)",
			migrationLockKey1,
			migrationLockKey2,
		); err != nil {
			slog.Error("migration lock release failed", "error", err)
		}
	}()

	if _, err := conn.Exec(ctx, "CREATE SCHEMA IF NOT EXISTS app"); err != nil {
		return fmt.Errorf("create app schema: %w", err)
	}

	_, err = conn.Exec(ctx, `
        CREATE TABLE IF NOT EXISTS app.schema_migrations (
            version BIGINT PRIMARY KEY,
            filename TEXT NOT NULL,
            checksum CHAR(64) NOT NULL,
            applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            execution_ms BIGINT NOT NULL DEFAULT 0
        )
    `)
	if err != nil {
		return fmt.Errorf("initialize migration ledger: %w", err)
	}

	migrations, err := loadMigrations()
	if err != nil {
		return err
	}

	for _, m := range migrations {
		if err := applyMigration(ctx, conn, m); err != nil {
			return fmt.Errorf("migration %s failed: %w", m.Filename, err)
		}
	}

	slog.Info(
		"database migrations completed",
		"migration_count", len(migrations),
	)

	return nil
}

func loadMigrations() ([]migration, error) {
	entries, err := fs.Glob(migrationFiles, "sql/*.sql")
	if err != nil {
		return nil, fmt.Errorf("list migration files: %w", err)
	}

	sort.Strings(entries)

	migrations := make([]migration, 0, len(entries))

	for _, filename := range entries {
		base := path.Base(filename)
		parts := strings.SplitN(base, "_", 2)

		if len(parts) != 2 || !strings.HasSuffix(base, ".sql") {
			return nil, fmt.Errorf("invalid migration filename: %s", base)
		}

		version, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil || version <= 0 {
			return nil, fmt.Errorf("invalid migration version: %s", base)
		}

		content, err := migrationFiles.ReadFile(filename)
		if err != nil {
			return nil, fmt.Errorf("read migration %s: %w", base, err)
		}

		hash := sha256.Sum256(content)

		migrations = append(migrations, migration{
			Version:  version,
			Filename: base,
			SQL:      string(content),
			Checksum: hex.EncodeToString(hash[:]),
		})
	}

	for i := 1; i < len(migrations); i++ {
		if migrations[i-1].Version == migrations[i].Version {
			return nil, fmt.Errorf(
				"duplicate migration version: %d",
				migrations[i].Version,
			)
		}
	}

	return migrations, nil
}

func applyMigration(
	ctx context.Context,
	conn *pgxpool.Conn,
	m migration,
) error {
	var existingChecksum string

	err := conn.QueryRow(
		ctx,
		`SELECT checksum
         FROM app.schema_migrations
         WHERE version = $1`,
		m.Version,
	).Scan(&existingChecksum)

	if err == nil {
		if strings.TrimSpace(existingChecksum) != m.Checksum {
			return fmt.Errorf(
				"checksum mismatch for %s; applied migration was modified",
				m.Filename,
			)
		}

		slog.Info(
			"migration already applied",
			"version", m.Version,
			"filename", m.Filename,
		)
		return nil
	}

	if err != pgx.ErrNoRows {
		return fmt.Errorf("read migration ledger: %w", err)
	}

	tx, err := conn.Begin(ctx)
	if err != nil {
		return fmt.Errorf("begin migration transaction: %w", err)
	}
	defer tx.Rollback(context.Background())

	started := time.Now()

	// Execute the complete SQL file using PostgreSQL simple protocol.
	if _, err := tx.Conn().PgConn().Exec(ctx, m.SQL).ReadAll(); err != nil {
		return fmt.Errorf("execute SQL: %w", err)
	}

	elapsed := time.Since(started).Milliseconds()

	_, err = tx.Exec(
		ctx,
		`INSERT INTO app.schema_migrations
         (version, filename, checksum, execution_ms)
         VALUES ($1, $2, $3, $4)`,
		m.Version,
		m.Filename,
		m.Checksum,
		elapsed,
	)
	if err != nil {
		return fmt.Errorf("record migration: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit migration: %w", err)
	}

	slog.Info(
		"migration applied",
		"version", m.Version,
		"filename", m.Filename,
		"execution_ms", elapsed,
	)

	return nil
}
