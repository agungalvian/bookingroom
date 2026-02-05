#!/bin/bash

# Simplified startup script - menggunakan Dockerfile.dev yang lebih sederhana

echo "🚀 Starting BP TAPERA Meeting Room Booking (Simplified)"
echo "=================================================="

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Clean up
echo "🧹 Cleaning up old images..."
docker system prune -f

# Build with no cache
echo "🔨 Building fresh images..."
docker-compose build --no-cache

# Start services
echo "▶️  Starting services..."
docker-compose up -d

# Wait for database
echo "⏳ Waiting for database (15 seconds)..."
sleep 15

# Run migrations
echo "🔄 Running migrations..."
docker-compose exec app npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
docker-compose exec app npx prisma db seed

echo ""
echo "✅ Done!"
echo "=================================================="
echo "🌐 Application: http://localhost:4000"
echo "🗄️  pgAdmin: http://localhost:8080"
echo ""
echo "📝 Login: admin@bptapera.go.id / admin123"
echo ""
echo "📊 View logs: docker-compose logs -f app"
echo "🛑 Stop: docker-compose down"
