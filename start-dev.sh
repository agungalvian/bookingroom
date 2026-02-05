#!/bin/bash

# Script untuk menjalankan aplikasi dalam mode development

echo "🚀 Starting BP TAPERA Meeting Room Booking System (Development)"
echo "=================================================="

# Start database saja
echo "📦 Starting database services..."
docker-compose -f docker-compose.dev.yml up -d

# Tunggu database siap
echo "⏳ Waiting for database to be ready..."
sleep 10

# Install dependencies jika belum
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma Client
echo "🔄 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🔄 Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

# Start Next.js development server
echo ""
echo "✅ Database is ready!"
echo "🚀 Starting Next.js development server..."
echo "=================================================="
echo "🌐 Application: http://localhost:3000"
echo "🗄️  pgAdmin: http://localhost:8080"
echo ""
echo "📝 Login credentials:"
echo "   Email: admin@bptapera.go.id"
echo "   Password: admin123"
echo ""

npm run dev
