
$ErrorActionPreference = "Stop"

$Root = "D:\HOSPITALITY_AI_OS"
$Api = Join-Path $Root "services\api"
$Scripts = Join-Path $Root "scripts"

$Files = @(
    "$Api\internal\config\config.go",
    "$Api\cmd\server\main.go",
    "$Api\internal\health\readiness.go"
)

Write-Host "`n=== HOSPITALITY AI OS BACKEND INTEGRATION ===" -ForegroundColor Cyan

# Safety checks
foreach ($File in $Files) {
    if (Test-Path $File) {
        $Backup = "$File.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Copy-Item $File $Backup
        Write-Host "Backup: $Backup" -ForegroundColor Yellow
    }
}

# Ensure required directories
New-Item -ItemType Directory -Force -Path "$Api\internal\config" | Out-Null
New-Item -ItemType Directory -Force -Path "$Api\internal\health" | Out-Null

# Configuration
$ConfigSource = @'
package config

import (
    "fmt"
    "net"
    "net/url"
    "os"
    "strconv"
)

type Config struct {
    AppName      string
    AppEnv       string
    Port         string
    DatabaseURL  string
    RedisAddr    string
    RedisPassword string
}

func Load() (Config, error) {
    cfg := Config{
        AppName:       getEnv("APP_NAME", "HOSPITALITY_AI_OS"),
        AppEnv:        getEnv("APP_ENV", "development"),
        Port:          getEnv("API_PORT", "8090"),
        RedisPassword: os.Getenv("REDIS_PASSWORD"),
    }

    dbHost := getEnv("POSTGRES_HOST", "127.0.0.1")
    dbPort := getEnv("POSTGRES_PORT", "15443")
    dbName := os.Getenv("POSTGRES_DB")
    dbUser := os.Getenv("POSTGRES_USER")
    dbPassword := os.Getenv("POSTGRES_PASSWORD")

    redisHost := getEnv("REDIS_HOST", "127.0.0.1")
    redisPort := getEnv("REDIS_PORT", "6388")

    if cfg.Port == "" {
        return Config{}, fmt.Errorf("API_PORT cannot be empty")
    }

    if dbName == "" || dbUser == "" || dbPassword == "" {
        return Config{}, fmt.Errorf("PostgreSQL configuration is incomplete")
    }

    if _, err := strconv.Atoi(dbPort); err != nil {
        return Config{}, fmt.Errorf("invalid POSTGRES_PORT")
    }

    if _, err := strconv.Atoi(redisPort); err != nil {
        return Config{}, fmt.Errorf("invalid REDIS_PORT")
    }

    u := &url.URL{
        Scheme: "postgres",
        User: url.UserPassword(dbUser, dbPassword),
        Host: net.JoinHostPort(dbHost, dbPort),
        Path: "/" + dbName,
        RawQuery: "sslmode=disable",
    }

    cfg.DatabaseURL = u.String()
    cfg.RedisAddr = net.JoinHostPort(redisHost, redisPort)

    return cfg, nil
}

func getEnv(key, fallback string) string {
    value := os.Getenv(key)
    if value == "" {
        return fallback
    }
    return value
}
'@

# Readiness handler
$ReadinessSource = @'
package health

import (
    "context"
    "encoding/json"
    "net/http"
    "time"

    "github.com/jackc/pgx/v5/pgxpool"
    "github.com/redis/go-redis/v9"
)

func ReadinessHandler(db *pgxpool.Pool, redisClient *redis.Client) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
        defer cancel()

        checks := map[string]string{}
        ready := true

        if err := db.Ping(ctx); err != nil {
            checks["postgres"] = "unavailable"
            ready = false
        } else {
            checks["postgres"] = "ok"
        }

        if err := redisClient.Ping(ctx).Err(); err != nil {
            checks["redis"] = "unavailable"
            ready = false
        } else {
            checks["redis"] = "ok"
        }

        status := http.StatusOK
        result := "ready"

        if !ready {
            status = http.StatusServiceUnavailable
            result = "not_ready"
        }

        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(status)

        _ = json.NewEncoder(w).Encode(map[string]interface{}{
            "status": result,
            "service": "hospitality-core-api",
            "checks": checks,
            "timestamp": time.Now().UTC(),
        })
    }
}
'@

# Main server
$MainSource = @'
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
        context.Background(), 10*time.Second,
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

    redisClient := redis.NewClient(&redis.Options{
        Addr: cfg.RedisAddr,
        Password: cfg.RedisPassword,
    })
    defer redisClient.Close()

    if err := redisClient.Ping(startupCtx).Err(); err != nil {
        slog.Error("Redis connection failed", "error", err)
        os.Exit(1)
    }

    mux := http.NewServeMux()
    mux.HandleFunc("GET /health", health.Handler())
    mux.HandleFunc("GET /ready", health.ReadinessHandler(db, redisClient))

    server := &http.Server{
        Addr: ":" + cfg.Port,
        Handler: mux,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout: 15 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout: 60 * time.Second,
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
        context.Background(), 10*time.Second,
    )
    defer cancel()

    if err := server.Shutdown(shutdownCtx); err != nil {
        slog.Error("graceful shutdown failed", "error", err)
    }

    slog.Info("server stopped")
}
'@

# Write source files without BOM
[System.IO.File]::WriteAllText(
    "$Api\internal\config\config.go",
    $ConfigSource,
    [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
    "$Api\internal\health\readiness.go",
    $ReadinessSource,
    [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
    "$Api\cmd\server\main.go",
    $MainSource,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host "`n=== INSTALL GO DEPENDENCIES ===" -ForegroundColor Cyan

Push-Location $Api
try {
    go get github.com/jackc/pgx/v5
    if ($LASTEXITCODE -ne 0) { throw "pgx installation failed" }

    go get github.com/redis/go-redis/v9
    if ($LASTEXITCODE -ne 0) { throw "Redis installation failed" }

    gofmt -w cmd/server/main.go internal/config/config.go internal/health/readiness.go

    Write-Host "`n=== GO TEST ===" -ForegroundColor Cyan
    go test ./...
    if ($LASTEXITCODE -ne 0) { throw "Go tests failed" }

    Write-Host "`n=== BUILD API ===" -ForegroundColor Cyan
    go build -o hospitality-api.exe ./cmd/server
    if ($LASTEXITCODE -ne 0) { throw "API build failed" }
}
finally {
    Pop-Location
}

Write-Host "`nINTEGRATION SOURCE CREATED AND BUILD CHECK COMPLETED." -ForegroundColor Green
