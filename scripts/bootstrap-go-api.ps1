
$ErrorActionPreference = "Stop"

$Root = "D:\HOSPITALITY_AI_OS"
$Api = Join-Path $Root "services\api"

Write-Host "`n=== HOSPITALITY CORE API BOOTSTRAP ===" -ForegroundColor Cyan

# Create directories
$dirs = @(
    "cmd\server",
    "internal\config",
    "internal\health",
    "internal\platform",
    "migrations",
    "pkg"
)

foreach ($dir in $dirs) {
    $path = Join-Path $Api $dir
    New-Item -ItemType Directory -Force -Path $path | Out-Null
    Write-Host "[DIR] $dir" -ForegroundColor Green
}

# Protect existing files
$targets = @(
    "go.mod",
    "cmd\server\main.go",
    "internal\config\config.go",
    "internal\health\handler.go",
    "README.md"
)

foreach ($target in $targets) {
    $path = Join-Path $Api $target
    if (Test-Path $path) {
        throw "Existing file detected: $path. Aborting to prevent overwrite."
    }
}

# go.mod
@'
module github.com/hospitality-ai-os/services/api

go 1.25.0
'@ | Set-Content (Join-Path $Api "go.mod") -Encoding UTF8

# Configuration
@'
package config

import (
    "fmt"
    "os"
)

type Config struct {
    AppName string
    AppEnv  string
    Port    string
}

func Load() (Config, error) {
    cfg := Config{
        AppName: getEnv("APP_NAME", "HOSPITALITY_AI_OS"),
        AppEnv:  getEnv("APP_ENV", "development"),
        Port:    getEnv("API_PORT", "8090"),
    }

    if cfg.Port == "" {
        return Config{}, fmt.Errorf("API_PORT cannot be empty")
    }

    return cfg, nil
}

func getEnv(key, fallback string) string {
    value := os.Getenv(key)
    if value == "" {
        return fallback
    }
    return value
}
'@ | Set-Content (Join-Path $Api "internal\config\config.go") -Encoding UTF8

# Health handler
@'
package health

import (
    "encoding/json"
    "net/http"
    "time"
)

type Response struct {
    Status    string    `json:"status"`
    Service   string    `json:"service"`
    Timestamp time.Time `json:"timestamp"`
}

func Handler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)

        response := Response{
            Status:    "ok",
            Service:   "hospitality-core-api",
            Timestamp: time.Now().UTC(),
        }

        _ = json.NewEncoder(w).Encode(response)
    }
}
'@ | Set-Content (Join-Path $Api "internal\health\handler.go") -Encoding UTF8

# Main server
@'
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
)

func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
    slog.SetDefault(logger)

    cfg, err := config.Load()
    if err != nil {
        slog.Error("configuration failed", "error", err)
        os.Exit(1)
    }

    mux := http.NewServeMux()
    mux.HandleFunc("GET /health", health.Handler())

    server := &http.Server{
        Addr:              ":" + cfg.Port,
        Handler:           mux,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       15 * time.Second,
        WriteTimeout:      30 * time.Second,
        IdleTimeout:       60 * time.Second,
    }

    go func() {
        slog.Info("server starting",
            "app", cfg.AppName,
            "environment", cfg.AppEnv,
            "port", cfg.Port,
        )

        if err := server.ListenAndServe(); err != nil &&
            !errors.Is(err, http.ErrServerClosed) {
            slog.Error("server failed", "error", err)
            os.Exit(1)
        }
    }()

    stop := make(chan os.Signal, 1)
    signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
    <-stop

    ctx, cancel := context.WithTimeout(
        context.Background(),
        10*time.Second,
    )
    defer cancel()

    if err := server.Shutdown(ctx); err != nil {
        slog.Error("graceful shutdown failed", "error", err)
    }

    slog.Info("server stopped")
}
'@ | Set-Content (Join-Path $Api "cmd\server\main.go") -Encoding UTF8

# Service README
@'
# Hospitality Core API

Go-based core backend for Hospitality AI OS.

## Initial endpoint

GET /health

## Configuration

- APP_NAME
- APP_ENV
- API_PORT

## Run

go run ./cmd/server

## Test

go test ./...
'@ | Set-Content (Join-Path $Api "README.md") -Encoding UTF8

Write-Host "`n=== FORMATTING ===" -ForegroundColor Cyan

Push-Location $Api
try {
    gofmt -w cmd internal
    go mod tidy

    Write-Host "`n=== GO TEST ===" -ForegroundColor Cyan
    go test ./...

    Write-Host "`n=== GO BUILD ===" -ForegroundColor Cyan
    go build -o hospitality-api.exe ./cmd/server
}
finally {
    Pop-Location
}

Write-Host "`n=== BOOTSTRAP COMPLETED ===" -ForegroundColor Green
Write-Host "API directory: $Api"
