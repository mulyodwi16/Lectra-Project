# Lectra - IoT Sensor Dashboard

Dashboard real-time untuk monitoring sensor IoT menggunakan Tuya API dengan teknologi terkini.

## Stack Technologies

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Go + Fiber
- **Styling**: CSS Grid, Responsive Design (Black & #d6ff3f theme)
- **API**: Tuya Cloud API Integration
- **Infrastructure**: Docker + Docker Compose + Traefik (Reverse Proxy)

## Prerequisites

- Docker & Docker Compose
- Go 1.21+ (untuk development lokal)
- Node.js 20+ (untuk development lokal)
- Tuya API Credentials

## Quick Start

### 1. Clone & Setup

```bash
cd tuya-dashboard
cp .env.example .env
```

### 2. Update .env dengan credentials Tuya Anda

```bash
TUYA_CLIENT_ID=your_client_id
TUYA_ACCESS_TOKEN=your_access_token
TUYA_DEVICE_ID=your_device_id
```

### 3. Run with Docker

```bash
docker-compose up -d
```

Akses dashboard di: `http://localhost`

Traefik dashboard: `http://localhost:8080`

## Development Lokal (Tanpa Docker)

### Backend (Go)

```bash
cd backend
go mod tidy
cp .env.example .env
# Update .env dengan credentials Tuya
go run .
# Backend berjalan di http://localhost:3000
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Frontend berjalan di http://localhost:5173
```

## Project Structure

```
tuya-dashboard/
├── backend/
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   ├── tuya_service.go
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Dashboard.css
│   │   │   ├── SensorCard.tsx
│   │   │   └── SensorCard.css
│   │   ├── services/
│   │   │   └── tuyaService.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── nginx.conf
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
└── .env.example
```

## API Endpoints

### Get Device Status
```
GET /api/v1/devices/{deviceId}/status
```

### Get Device Functions
```
GET /api/v1/devices/{deviceId}/functions
```

### Execute Command
```
POST /api/v1/devices/{deviceId}/commands
Body: {"commands":[{"code":"switch_1","value":true}]}
```

### Health Check
```
GET /api/v1/health
```

## Features

✅ Real-time sensor monitoring
✅ Interactive control (toggle switches)
✅ Responsive design untuk mobile & desktop
✅ Dark theme dengan accent color #d6ff3f
✅ Auto-refresh setiap 5 detik
✅ Error handling & loading states
✅ Docker containerization + Traefik reverse proxy

## Design

- **Color Scheme**: Black (#000) with Neon Green accent (#d6ff3f)
- **Typography**: Modern, uppercase for headings
- **Layout**: CSS Grid responsive layout
- **Animations**: Smooth transitions & hover effects

## Security Notes

⚠️ **Never commit .env file dengan credentials asli!**
- Selalu gunakan `.env.example` sebagai template
- Untuk production, gunakan secret management system

## Troubleshooting

### Backend tidak bisa connect ke Tuya API
- Periksa TUYA_CLIENT_ID dan TUYA_ACCESS_TOKEN di .env
- Pastikan device ID benar
- Check internet connection

### Frontend blank / styling tidak muncul
- Clear browser cache (Ctrl + Shift + Delete)
- Rebuild frontend: `docker-compose up --build frontend`
- Check nginx configuration

### Traefik dashboard tidak accessible
- Pastikan port 8080 tidak terpakai
- Check docker network: `docker network ls`

## Production Deployment

### AWS/GCP/DigitalOcean
```bash
docker-compose -f docker-compose.yml up -d
```

Pastikan:
- Security groups open port 80/443
- SSL certificate via Let's Encrypt + Traefik
- Environment variables aman (gunakan secrets manager)

## License

MIT

## Author

Lectra IoT Dashboard - 2026
