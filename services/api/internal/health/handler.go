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
