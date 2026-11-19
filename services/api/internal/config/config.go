package config

import (
	"fmt"
	"net"
	"net/url"
	"os"
	"strconv"
)

type Config struct {
	AppName       string
	AppEnv        string
	Port          string
	DatabaseURL   string
	RedisAddr     string
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
		Scheme:   "postgres",
		User:     url.UserPassword(dbUser, dbPassword),
		Host:     net.JoinHostPort(dbHost, dbPort),
		Path:     "/" + dbName,
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
