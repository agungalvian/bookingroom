#!/bin/bash

# Manual seed script untuk Docker

echo "🌱 Seeding database in Docker container..."

docker-compose exec app npx prisma db seed

echo ""
echo "✅ Seeding complete!"
echo ""
echo "📝 Admin user created:"
echo "   Email: admin@bptapera.go.id"
echo "   Password: admin123"
