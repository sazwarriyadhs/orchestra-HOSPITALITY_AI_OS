package database

import "embed"

//go:embed sql/*.sql
var migrationFiles embed.FS
