package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/hospitality-ai-os/services/api/internal/config"
	"github.com/hospitality-ai-os/services/api/internal/database"
	"github.com/hospitality-ai-os/services/api/internal/health"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	cfg, err := config.Load()
	if err != nil {
		slog.Error("configuration failed", "error", err)
		os.Exit(1)
	}

	startupCtx, startupCancel := context.WithTimeout(
		context.Background(),
		30*time.Second,
	)
	defer startupCancel()

	db, err := pgxpool.New(startupCtx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("PostgreSQL initialization failed", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	if err := db.Ping(startupCtx); err != nil {
		slog.Error("PostgreSQL connection failed", "error", err)
		os.Exit(1)
	}

	slog.Info("PostgreSQL connected")

	if err := database.Run(startupCtx, db); err != nil {
		slog.Error("database migration failed", "error", err)
		os.Exit(1)
	}

	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.RedisAddr,
		Password: cfg.RedisPassword,
	})
	defer redisClient.Close()

	if err := redisClient.Ping(startupCtx).Err(); err != nil {
		slog.Error("Redis connection failed", "error", err)
		os.Exit(1)
	}

	slog.Info("Redis connected")

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", health.Handler())
	mux.HandleFunc("GET /ready", health.ReadinessHandler(db, redisClient))

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	serverErrors := make(chan error, 1)

	go func() {
		slog.Info("server starting",
			"app", cfg.AppName,
			"environment", cfg.AppEnv,
			"port", cfg.Port,
		)

		if err := server.ListenAndServe(); err != nil &&
			!errors.Is(err, http.ErrServerClosed) {
			serverErrors <- err
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	defer signal.Stop(stop)

	select {
	case sig := <-stop:
		slog.Info("shutdown signal received", "signal", sig.String())
	case err := <-serverErrors:
		slog.Error("server failed", "error", err)
	}

	shutdownCtx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		slog.Error("graceful shutdown failed", "error", err)
	}

	slog.Info("server stopped")
}
