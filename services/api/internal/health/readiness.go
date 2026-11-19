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
			"status":    result,
			"service":   "hospitality-core-api",
			"checks":    checks,
			"timestamp": time.Now().UTC(),
		})
	}
}
