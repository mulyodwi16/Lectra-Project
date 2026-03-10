# Lectra - IoT Sensor Dashboard

Dashboard real-time untuk monitoring sensor IoT menggunakan Tuya API dengan teknologi terkini.

📦 **Repository**: [GitHub - mulyodwi16/Lectra-Project](https://github.com/mulyodwi16/Lectra-Project)

## Stack Technologies

- **Frontend**: React 18 + Vite + TypeScript + Nginx (internal web server)
- **Backend**: Go + Fiber
- **Styling**: CSS Grid, Responsive Design (Black & #d6ff3f theme)
- **API**: Tuya Cloud API Integration
- **Infrastructure**: Docker + Docker Compose + **Traefik** (Reverse Proxy)

## Architecture

```
┌─────────────────────────────────────────┐
│         Traefik Reverse Proxy           │
│  (lectra.local:80) - Routing Layer      │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
   ┌────▼────┐   ┌────▼────┐
   │Frontend  │   │Backend   │
   │Container │   │Container │
   ├──────────┤   ├──────────┤
   │ Nginx 80 │   │ Fiber:3k │
   │ React    │   │ Go API   │
   └──────────┘   └──────────┘
```

**Traefik Routing**: 
- `http://lectra.local` → Frontend (React App)
- `http://lectra.local/api/*` → Backend (Go API)

## Prerequisites

- Docker & Docker Compose
- Go 1.21+ (untuk development lokal)
- Node.js 20+ (untuk development lokal)
- Tuya API Credentials

## Quick Start (Local Development with Docker)

### 1. Clone Repository

```bash
git clone https://github.com/mulyodwi16/Lectra-Project.git
cd Lectra-Project
```

### 2. Configure Host File (Important!)

Agar `lectra.local` bisa diakses, tambahkan entry ke host file:

**Windows** (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1   lectra.local
```

**Linux/Mac** (`/etc/hosts`):
```bash
echo "127.0.0.1   lectra.local" | sudo tee -a /etc/hosts
```

Atau cukup akses melalui `http://localhost` jika tidak mau edit hosts.

### 3. Setup Environment Variables

```bash
cp .env.example .env
# Edit .env dengan Tuya credentials Anda
```

**File: `.env`**
```env
# Tuya IoT Platform Credentials
TUYA_CLIENT_ID=your_client_id_from_tuya
TUYA_ACCESS_TOKEN=your_access_token_from_tuya
TUYA_DEVICE_ID=your_device_id_from_tuya

# Environment
ENVIRONMENT=development
```

📝 **Cara mendapatkan Tuya credentials:**
1. Daftar di [Tuya Developer Platform](https://platform.tuya.com)
2. Create project → IoT Platform
3. Get credentials di "Service Account" atau "Link Device"

### 4. Run with Docker

```bash
# Build images
docker-compose build

# Start all services (Traefik, Backend, Frontend)
docker-compose up -d

# Check status
docker-compose ps
```

✅ **Akses aplikasi:**
- Dashboard: **http://lectra.local** (atau `http://localhost`)
- API: **http://lectra.local/api/v1/health**
- Traefik Dashboard: **http://localhost:8080**

> **⚠️ Catatan Arsitektur**: Nginx di dalam frontend container hanya serve React app. **Traefik** adalah main reverse proxy yang routing semua request.

### 5. Lihat Logs

```bash
# Semua services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

### 6. Stop Services

```bash
docker-compose down          # Stop & remove containers
docker-compose down -v       # Stop & remove + volumes
```

### Using Makefile (Recommended for Quick Commands)

```bash
make build        # Build Docker images
make up           # Start all services
make down         # Stop all services
make logs         # View all logs in real-time
make backend-logs # View backend logs only
make frontend-logs # View frontend logs only
make clean        # Remove all containers & images
make rebuild      # Rebuild all without cache
```

### Quick Commands untuk Development

```bash
make dev-backend   # Run Go backend locally di http://localhost:3000
make dev-frontend  # Run React frontend locally di http://localhost:5173
```

## Deployment Guide

### A. Local Development (Without Docker)

#### Backend (Go)

```bash
cd backend
go mod tidy
cp .env.example .env

# Edit .env dengan Tuya credentials
go run .
# Backend berjalan di http://localhost:3000
```

#### Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Frontend berjalan di http://localhost:5173
```

### B. Local Deployment with Docker (Recommended for Testing)

Sudah tercakup di section **Quick Start** di atas.

### C. Server Deployment (Ubuntu/Debian VPS)

**Prerequisites di Server:**
- Ubuntu 20.04+ atau Debian
- Docker & Docker Compose installed
- Domain name (e.g., `lectra.mydomain.com`)
- SSL certificate (via Let's Encrypt)
- SSH access ke server

#### Step 1: Setup Server

```bash
# SSH ke server
ssh ubuntu@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker (jika belum)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user ke docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### Step 2: Clone & Setup Project

```bash
# Clone repository
git clone https://github.com/mulyodwi16/Lectra-Project.git
cd Lectra-Project

# Create .env untuk production
cp .env.example .env
nano .env  # Edit dengan production credentials
```

#### Step 3: Configure Domain & SSL (Optional tapi Recommended)

Edit `docker-compose.yml` untuk enable SSL dengan Traefik:

```yaml
services:
  traefik:
    command:
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--providers.docker=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/letsencrypt/acme.json:/letsencrypt/acme.json"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  frontend:
    labels:
      - "traefik.http.routers.frontend.rule=Host(`lectra.mydomain.com`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"

  backend:
    labels:
      - "traefik.http.routers.backend.rule=Host(`lectra.mydomain.com`) && PathPrefix(`/api`)"
      - "traefik.http.routers.backend.entrypoints=websecure"
      - "traefik.http.routers.backend.tls.certresolver=letsencrypt"
```

#### Step 4: Deploy

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### Step 5: Verify Deployment

```bash
# Check backend health
curl https://lectra.mydomain.com/api/v1/health

# Check frontend
curl https://lectra.mydomain.com

# Check Traefik dashboard (untuk lokal saja, jangan expose ke public!)
# http://localhost:8080
```

### D. Update Deployment

```bash
# Pull latest code
git pull origin main

# Rebuild & restart
docker-compose up --build -d

# Check status
docker-compose logs -f
```

### E. Monitoring & Maintenance

```bash
# View real-time logs
docker-compose logs -f

# Check container health
docker-compose ps

# View resource usage
docker stats

# Clean up unused images/volumes
docker system prune -v

# Backup data (jika ada persistent volumes)
docker-compose down
tar -czf backup.tar.gz .
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

### 1. Backend tidak bisa connect ke Tuya API

**Symptoms**: Error "401 Unauthorized" atau timeout

**Solutions**:
```bash
# Verifikasi .env credentials
cat .env | grep TUYA

# Test backend connection
curl http://localhost:3000/api/v1/health

# Check logs
docker-compose logs backend

# Pastikan device ID valid di Tuya platform
```

### 2. Frontend blank / styling tidak muncul

**Solutions**:
```bash
# Clear browser cache (Ctrl + Shift + Delete)
# Stop & rebuild frontend
docker-compose down
docker-compose up --build -d

# Verify frontend is running
docker-compose logs frontend
```

### 3. Traefik dashboard tidak accessible

**Solutions**:
```bash
# Check if port 8080 is open
netstat -an | grep 8080

# Check docker network
docker network ls
docker network inspect lectra-network

# Restart traefik
docker-compose restart traefik
```

### 4. "Cannot connect to Docker daemon" error

**Solutions**:
```bash
# Check if Docker is running
docker -v

# Start Docker service (Linux)
sudo systemctl start docker

# Check Docker by running a test container
docker run hello-world
```

### 5. Port already in use (80, 8080, 3000)

**Solutions**:
```bash
# Find process using port
lsof -i :80     # Linux/Mac
netstat -ano | findstr :80  # Windows

# Kill process or use different port in docker-compose.yml
```

### 6. Host file tidak work (`lectra.local` not resolving)

**Solutions**:
- Gunakan `http://localhost` sebagai alternatif
- Verify host file entry: `ping lectra.local`
- Flush DNS cache: `ipconfig /flushdns` (Windows)

### 7. Environment variables tidak ter-load

**Solutions**:
```bash
# Verify .env file exists
ls -la .env

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check if env vars are loaded
docker-compose exec backend env | grep TUYA
```

## Security & Best Practices

### Environment Variables
⚠️ **NEVER commit `.env` dengan real credentials!**

```bash
# .gitignore (already configured)
.env
.env.local
.env.*.local
```

✅ **Production Security Checklist**:
- [ ] Use `.env.example` sebagai template
- [ ] Store credentials di secret management (AWS Secrets, Vault, etc)
- [ ] Enable SSL/HTTPS dengan Let's Encrypt
- [ ] Setup firewall (only allow ports 80, 443)
- [ ] Use strong Tuya API credentials
- [ ] Regular backups
- [ ] Monitor logs regularly
- [ ] Keep Docker images updated

### Docker Security

```bash
# Run containers with non-root user (Dockerfiles sudah configured)
# Limit resources
docker-compose up -d --memory 512m

# Scan images untuk vulnerabilities
docker scan lectra-project_backend
docker scan lectra-project_frontend
```

### API Security Notes

- Backend API hanya bisa diakses via Traefik (tidak expose langsung)
- Implement rate limiting jika expose ke public
- Add authentication layer untuk production
- Validate all user inputs di backend

## Contributing & License

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

**Built with ❤️ by Dimyodi**  
Dokumentasi terakhir diupdate: March 2026

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
