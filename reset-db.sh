#!/bin/bash

# Script untuk reset dan setup ulang database

echo "🔄 Resetting database and reseeding..."
echo "=================================================="

# Reset database di container
echo "📊 Resetting database..."
docker-compose exec app npx prisma migrate reset --force

echo ""
echo "✅ Database reset complete!"
echo "=================================================="
echo "🌐 Application: http://localhost:4000"
echo ""
echo "📝 Login credentials:"
echo "   Email: admin@bptapera.go.id"
echo "   Password: admin123"
