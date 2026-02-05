# Quick Start Guide - BP TAPERA Meeting Room Booking

## 🚀 Cara Tercepat (Development Mode)

```bash
# 1. Berikan permission
chmod +x start-dev.sh

# 2. Jalankan
./start-dev.sh
```

Aplikasi akan berjalan di **http://localhost:3000**

## 🐳 Production Mode (Full Docker)

```bash
# 1. Berikan permission
chmod +x start-production.sh

# 2. Jalankan
./start-production.sh
```

Aplikasi akan berjalan di **http://localhost:4000**

## 📝 Login

- **Email**: admin@bptapera.go.id
- **Password**: admin123

## ⚙️ Manual Setup (jika script tidak jalan)

### Development:
```bash
# Start database
docker-compose -f docker-compose.dev.yml up -d

# Install & setup
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# Run app
npm run dev
```

### Production:
```bash
# Build & start
docker-compose up --build -d

# Wait 10 seconds, then:
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

## 🛑 Stop Services

```bash
# Development
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose down
```

## 📊 Access Points

- **App (Dev)**: http://localhost:3000
- **App (Prod)**: http://localhost:4000
- **pgAdmin**: http://localhost:8080
  - Email: admin@admin.com
  - Password: admin

## ❗ Troubleshooting

### Foreign key constraint error (Booking_userId_fkey):
Database belum di-seed. Jalankan:
```bash
chmod +x seed-db.sh
./seed-db.sh
```

Atau reset database sepenuhnya:
```bash
chmod +x reset-db.sh
./reset-db.sh
```

### Docker build error:
```bash
# Clean rebuild
docker-compose down
docker system prune -f
docker-compose up --build -d
```

### Database connection error:
```bash
# Restart database
docker-compose restart db
# Wait 10 seconds
docker-compose exec app npx prisma migrate deploy
```

### Port already in use:
Edit `docker-compose.yml` dan ubah port mapping (contoh: `4000:3000`)
