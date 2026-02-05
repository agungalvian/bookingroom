# Pemesanan Ruang Meeting BP TAPERA

Aplikasi web untuk manajemen pemesanan ruang meeting di BP TAPERA dengan fitur autentikasi, kalendar, dan laporan.

## Fitur

- ✅ Autentikasi pengguna (NextAuth.js)
- ✅ Dashboard dengan statistik
- ✅ Pemesanan ruang meeting
- ✅ Kalendar jadwal ruang meeting
- ✅ Manajemen user (Admin)
- ✅ Manajemen ruang meeting (Admin)
- ✅ Konfirmasi pemesanan (Admin)
- ✅ Laporan penggunaan (Admin)
- ✅ Pengaturan LDAP (Admin)
- ✅ Docker Compose untuk deployment

## Tech Stack

- **Frontend**: Next.js 16, React 19, Vanilla CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Authentication**: NextAuth.js
- **Containerization**: Docker & Docker Compose

## Cara Menjalankan

### 1. Setup Database

```bash
# Start PostgreSQL dengan Docker Compose
docker-compose up -d

# Tunggu beberapa detik hingga database siap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database Schema

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database dengan data awal
npx prisma db seed
```

### 4. Jalankan Aplikasi

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Login Demo

- **Email**: admin@bptapera.go.id
- **Password**: admin123

## Database Management

Akses pgAdmin di `http://localhost:8080`:
- **Email**: admin@admin.com
- **Password**: admin

## Environment Variables

File `.env` sudah dikonfigurasi dengan:

```env
DATABASE_URL="postgresql://admin:password123@localhost:5432/bookingroom?schema=public"
NEXTAUTH_SECRET="39e0ba30206691494924a87c12660d5c"
NEXTAUTH_URL="http://localhost:3000"
```

## Struktur Database

- **User**: Pengguna sistem (internal & LDAP)
- **Room**: Data ruang meeting
- **Booking**: Pemesanan ruang meeting
- **Setting**: Konfigurasi aplikasi (LDAP, dll)

## Fitur Admin

Admin dapat mengakses:
- `/admin` - Konfirmasi pemesanan
- `/admin/rooms` - Manajemen ruang meeting
- `/admin/reports` - Laporan penggunaan
- `/admin/settings` - Pengaturan LDAP

## Deployment dengan Docker

### Option 1: Development Mode (Recommended untuk testing)

Database di Docker, aplikasi di local:

```bash
# Berikan permission untuk script
chmod +x start-dev.sh

# Jalankan script
./start-dev.sh
```

Atau manual:
```bash
# Start database
docker-compose -f docker-compose.dev.yml up -d

# Setup dan run aplikasi
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

### Option 2: Production Mode (Full Docker)

Semua service di Docker:

```bash
# Berikan permission untuk script
chmod +x start-production.sh

# Jalankan script
./start-production.sh
```

Atau manual:
```bash
# Build dan start semua services
docker-compose up --build -d

# Tunggu database siap, lalu run migrations
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

Akses:
- **Aplikasi**: http://localhost:3000
- **pgAdmin**: http://localhost:8080

Stop services:
```bash
# Development
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose down
```

## Troubleshooting

Jika ada masalah dengan Prisma:

```bash
# Reset database
npx prisma migrate reset

# Generate ulang client
npx prisma generate
```

## License

MIT
