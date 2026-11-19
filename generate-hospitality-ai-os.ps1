
# ============================================================
# HOSPITALITY AI OS - PROJECT STRUCTURE GENERATOR
# Enterprise Hospitality SaaS Platform
# ============================================================

param(
    [string]$ProjectRoot = "D:\HOSPITALITY_AI_OS"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   HOSPITALITY AI OS PROJECT GENERATOR" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Directory structure
$directories = @(
    "apps/web/admin",
    "apps/web/gm-dashboard",
    "apps/web/operations",
    "apps/web/front-office",
    "apps/web/guest-portal",

    "apps/mobile/guest-app",
    "apps/mobile/staff-app",
    "apps/mobile/manager-app",

    "services/api/cmd/server",
    "services/api/internal/auth",
    "services/api/internal/tenants",
    "services/api/internal/properties",
    "services/api/internal/guests",
    "services/api/internal/reservations",
    "services/api/internal/rooms",
    "services/api/internal/housekeeping",
    "services/api/internal/maintenance",
    "services/api/internal/staff",
    "services/api/internal/finance",
    "services/api/internal/reporting",
    "services/api/internal/notifications",
    "services/api/migrations",
    "services/api/pkg",

    "services/ai/api",
    "services/ai/agents",
    "services/ai/concierge",
    "services/ai/forecasting",
    "services/ai/revenue-intelligence",
    "services/ai/sentiment-analysis",
    "services/ai/recommendations",

    "services/integrations/pms",
    "services/integrations/pos",
    "services/integrations/booking-engines",
    "services/integrations/channel-managers",
    "services/integrations/payment-gateways",

    "packages/ui",
    "packages/shared-types",
    "packages/api-client",
    "packages/design-system",

    "infrastructure/docker",
    "infrastructure/kubernetes",
    "infrastructure/terraform",
    "infrastructure/monitoring",
    "infrastructure/deployment",

    "database/schemas",
    "database/seeds",
    "database/documentation",

    "docs/architecture",
    "docs/api",
    "docs/product",
    "docs/security",
    "docs/roadmap",

    "scripts",
    "tests/unit",
    "tests/integration",
    "tests/e2e"
)

# Create project root
if (!(Test-Path -LiteralPath $ProjectRoot)) {
    New-Item -ItemType Directory -Path $ProjectRoot -Force |
        Out-Null
}

# Create directories
$created = 0

foreach ($directory in $directories) {
    $path = Join-Path $ProjectRoot $directory

    if (!(Test-Path -LiteralPath $path)) {
        New-Item -ItemType Directory -Path $path -Force |
            Out-Null

        $created++
        Write-Host "[CREATE] $directory" -ForegroundColor Green
    }
    else {
        Write-Host "[EXISTS] $directory" -ForegroundColor DarkGray
    }
}

# Create root files only if they do not exist
$files = @{
    "README.md" = @"
# HOSPITALITY AI OS

AI-Powered Hotel Operations & Guest Experience Platform.

## Architecture

- Web: Next.js + TypeScript
- Mobile: Flutter + Dart
- Core API: Golang
- AI Services: Python + FastAPI
- Database: PostgreSQL
- Cache: Redis
- Infrastructure: Docker + Kubernetes

## Product Modules

1. AI General Manager Dashboard
2. Smart Hotel Operations
3. AI Guest Experience
4. AI Revenue Intelligence
5. Multi-Property Management

## Target Markets

UAE, Saudi Arabia, GCC and Global Hospitality.
"@

    ".gitignore" = @"
.env
.env.*
!.env.example
node_modules/
.next/
dist/
build/
.dart_tool/
.flutter-plugins*
__pycache__/
.venv/
venv/
*.pyc
*.exe
*.log
coverage/
.idea/
.vscode/
.DS_Store
"@

    ".env.example" = @"
APP_NAME=HOSPITALITY_AI_OS
APP_ENV=development

API_PORT=8090
AI_SERVICE_PORT=8100

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=hospitality_ai
POSTGRES_USER=hospitality

REDIS_HOST=localhost
REDIS_PORT=6379
"@
}

foreach ($file in $files.Keys) {
    $path = Join-Path $ProjectRoot $file

    if (!(Test-Path -LiteralPath $path)) {
        Set-Content -LiteralPath $path -Value $files[$file] -Encoding UTF8
        Write-Host "[FILE] $file" -ForegroundColor Yellow
    }
    else {
        Write-Host "[PRESERVED] $file" -ForegroundColor DarkGray
    }
}

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "       GENERATION COMPLETED" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan

Write-Host "Project : $ProjectRoot"
Write-Host "Folders : $($directories.Count)"
Write-Host "Created : $created"

Write-Host ""
Write-Host "Next step: inspect project structure." -ForegroundColor Yellow

Write-Host ""
