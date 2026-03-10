.PHONY: help build up down logs backend-logs frontend-logs dev-backend dev-frontend clean

help:
	@echo "Lectra Dashboard - Available Commands"
	@echo "======================================"
	@echo "make build          - Build Docker images"
	@echo "make up             - Start all services"
	@echo "make down           - Stop all services"
	@echo "make logs           - View all container logs"
	@echo "make backend-logs   - View backend logs"
	@echo "make frontend-logs  - View frontend logs"
	@echo "make clean          - Remove containers & images"
	@echo "make dev-backend    - Run backend locally (Go required)"
	@echo "make dev-frontend   - Run frontend locally (Node required)"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "✅ Lectra services running!"
	@echo "📊 Dashboard: http://localhost"
	@echo "🔧 Traefik: http://localhost:8080"

down:
	docker-compose down

logs:
	docker-compose logs -f

backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

dev-backend:
	cd backend && go run .

dev-frontend:
	cd frontend && npm install && npm run dev

clean:
	docker-compose down -v
	docker system prune -f

rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
