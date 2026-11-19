
# ============================================================
# HOSPITALITY AI OS
# PostgreSQL 17 + Redis 7 Infrastructure
# Non-destructive setup
# ============================================================

$ErrorActionPreference = "Stop"

$Root = "D:\HOSPITALITY_AI_OS"
$Infra = Join-Path $Root "infrastructure\docker"
$ComposeFile = Join-Path $Infra "docker-compose.yml"
$EnvFile = Join-Path $Root ".env"

Write-Host "`n=== HOSPITALITY DATABASE SETUP ===" -ForegroundColor Cyan

# 1. Docker verification
docker info | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "Docker daemon is unavailable."
}

docker compose version
if ($LASTEXITCODE -ne 0) {
    throw "Docker Compose plugin is required."
}

# 2. Port preflight
$ports = @(15443, 6388)

foreach ($port in $ports) {
    $listeners = Get-NetTCPConnection `
        -LocalPort $port `
        -State Listen `
        -ErrorAction SilentlyContinue

    if ($listeners) {
        throw "Port $port is already occupied. Setup aborted."
    }

    Write-Host "[PORT AVAILABLE] $port" -ForegroundColor Green
}

# 3. Protect existing configuration
if (Test-Path $ComposeFile) {
    throw "Existing docker-compose.yml detected. Refusing overwrite."
}

if (Test-Path $EnvFile) {
    throw "Existing .env detected. Refusing overwrite."
}

New-Item -ItemType Directory -Force -Path $Infra |
    Out-Null

# 4. Generate secure local development password
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()

try {
    $rng.GetBytes($bytes)
}
finally {
    $rng.Dispose()
}

$password = [Convert]::ToBase64String($bytes).
    TrimEnd('=').
    Replace('+', 'A').
    Replace('/', 'B')

# 5. Environment file
$envContent = @"
POSTGRES_DB=hospitality_ai
POSTGRES_USER=hospitality
POSTGRES_PASSWORD=$password

POSTGRES_PORT=15443
REDIS_PORT=6388
REDIS_PASSWORD=$password
"@

# 6. Docker Compose configuration
$composeContent = @'
name: hospitality-ai-os

services:
  postgres:
    image: postgres:17-alpine
    container_name: hospitality-ai-postgres
    restart: unless-stopped
    env_file:
      - ../../.env
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "127.0.0.1:15443:5432"
    volumes:
      - hospitality_ai_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  redis:
    image: redis:7-alpine
    container_name: hospitality-ai-redis
    restart: unless-stopped
    env_file:
      - ../../.env
    command:
      - sh
      - -c
      - exec redis-server --appendonly yes --requirepass "$$REDIS_PASSWORD"
    ports:
      - "127.0.0.1:6388:6379"
    volumes:
      - hospitality_ai_redis_data:/data
    healthcheck:
      test: ["CMD-SHELL", "redis-cli -a \"$$REDIS_PASSWORD\" ping | grep -q PONG"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  hospitality_ai_postgres_data:
    name: hospitality_ai_postgres_data

  hospitality_ai_redis_data:
    name: hospitality_ai_redis_data
'@

# 7. Write UTF-8 without BOM
$encoding = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
    $EnvFile,
    $envContent,
    $encoding
)

[System.IO.File]::WriteAllText(
    $ComposeFile,
    $composeContent,
    $encoding
)

Write-Host "[CREATED] .env" -ForegroundColor Green
Write-Host "[CREATED] docker-compose.yml" -ForegroundColor Green

# 8. Validate configuration before starting
Push-Location $Infra

try {
    Write-Host "`n=== COMPOSE VALIDATION ===" -ForegroundColor Cyan

    docker compose config --quiet

    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose configuration invalid."
    }

    Write-Host "[PASS] Compose configuration valid" -ForegroundColor Green

    # 9. Start only this project's services
    Write-Host "`n=== STARTING DATABASE SERVICES ===" -ForegroundColor Cyan

    docker compose up -d

    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose startup failed."
    }

    Write-Host "`n=== CONTAINER STATUS ===" -ForegroundColor Cyan

    docker compose ps
}
finally {
    Pop-Location
}

Write-Host "`n=== SETUP COMPLETED ===" -ForegroundColor Green
Write-Host "PostgreSQL: localhost:15443"
Write-Host "Redis:      localhost:6388"
Write-Host "Credentials: D:\HOSPITALITY_AI_OS\.env"
