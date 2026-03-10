# Lectra - IoT Sensor Dashboard

Dashboard real-time untuk monitoring sensor IoT menggunakan Tuya API dengan teknologi terkini.

📦 **Repository**: [GitHub - mulyodwi16/Lectra-Project](https://github.com/mulyodwi16/Lectra-Project)

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

### 1. Clone Repository

```bash
git clone https://github.com/mulyodwi16/Lectra-Project.git
cd Lectra-Project
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env dan masukkan Tuya credentials Anda
```

```bash
TUYA_CLIENT_ID=your_client_id
TUYA_ACCESS_TOKEN=your_access_token
TUYA_DEVICE_ID=your_device_id
```

### 3. Run with Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

✅ Akses dashboard di: **http://localhost**

🔧 Traefik dashboard: **http://localhost:8080**

### Using Makefile (Recommended)

```bash
make build        # Build images
make up           # Start services
make down         # Stop services
make logs         # View all logs
make backend-logs # View backend logs
make frontend-logs# View frontend logs
make clean        # Remove services & images
make rebuild      # Rebuild all (no cache)
```

Or untuk development lokal:
```bash
make dev-backend   # Run Go backend locally
make dev-frontend  # Run React frontend locally
```

## Development Lokal (Tanpa Docker)

### Backend (Go)

```bash
cd backend
go mod tidy
cp .env.example .env

# Edit .env dengan Tuya credentials
# Kemudian run:
go run .

# Backend berjalan di http://localhost:3000
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env

# Edit .env jika perlu (API URL sudah benar untuk local dev)
# Kemudian run:
npm run dev

# Frontend berjalan di http://localhost:5173
```

### Build untuk Production (Lokal)

```bash
# Backend
cd backend
CGO_ENABLED=0 GOOS=linux go build -o lectra-backend .

# Frontend
cd frontend
npm run build
# Output: dist/
```

## Project Structure

```
Lectra-Project/
├── backend/
│   ├── go.mod
│   ├── go.sum
│   ├── main.go                 (Fiber HTTP server & handlers)
│   ├── tuya_service.go         (Tuya API integration)
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx    (Main dashboard UI)
│   │   │   ├── Dashboard.css
│   │   │   ├── SensorCard.tsx   (Sensor card component)
│   │   │   └── SensorCard.css
│   │   ├── services/
│   │   │   └── tuyaService.ts   (Tuya API client)
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env.example
├── docker-compose.yml          (All services + Traefik)
├── Makefile                    (Helper commands)
├── README.md
├── .env.example
└── .gitignore
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

### Using Docker Compose (Recommended)

```bash
# 1. Clone repository ke server
git clone https://github.com/mulyodwi16/Lectra-Project.git
cd Lectra-Project

# 2. Setup environment
cp .env.example .env
# Edit .env dengan production credentials

# 3. Build & run
docker-compose build
docker-compose up -d

# 4. Verify
docker-compose logs -f
curl http://localhost/api/v1/health
```

### AWS/GCP/DigitalOcean Deployment

**Prerequisites:**
- VPS dengan Docker & Docker Compose installed
- Domain name untuk reverse proxy
- SSL certificate (Let's Encrypt)

**Steps:**
```bash
# 1. SSH ke server
ssh ubuntu@your-server-ip

# 2. Clone & setup (seperti di atas)
# ... follow steps 1-3

# 3. Configure SSL dengan Traefik (update docker-compose.yml)
# 4. Open firewall: ports 80, 443
# 5. Point domain ke server IP
```

### Environment Variables untuk Production

```env
ENVIRONMENT=production
TUYA_CLIENT_ID=prod_client_id
TUYA_ACCESS_TOKEN=prod_access_token
TUYA_DEVICE_ID=prod_device_id
```

⚠️ **Security:** Gunakan AWS Secrets Manager, GCP Secret Manager, atau HashiCorp Vault untuk production.

## Contributing

Want to contribute? Great! Follow these steps:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Roadmap

- [ ] WebSocket untuk real-time updates
- [ ] Database (PostgreSQL) untuk historical data
- [ ] Authentication & user management
- [ ] Multi-device support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & charts
- [ ] Alert system untuk anomaly detection

## License

MIT

## Author

Lectra IoT Dashboard - 2026
