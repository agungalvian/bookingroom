#!/bin/bash

echo "🔍 Checking database status..."
echo "=================================================="

# Check if app container is running
if ! docker ps | grep -q bookingroom_app; then
    echo "❌ App container is not running!"
    echo "Please start the application first:"
    echo "   docker-compose up -d"
    exit 1
fi

echo "✅ App container is running"
echo ""
echo "📊 Checking for admin user..."

# Check if admin user exists
ADMIN_EXISTS=$(docker-compose exec -T app npx prisma db execute --stdin <<EOF
SELECT COUNT(*) as count FROM "User" WHERE email = 'admin@bptapera.go.id';
EOF
)

if echo "$ADMIN_EXISTS" | grep -q "count.*0"; then
    echo "❌ Admin user not found in database!"
    echo ""
    echo "🌱 Seeding database now..."
    docker-compose exec app npx prisma db seed
    echo ""
    echo "✅ Database seeded successfully!"
else
    echo "✅ Admin user exists in database"
fi

echo ""
echo "=================================================="
echo "📝 Login credentials:"
echo "   Email: admin@bptapera.go.id"
echo "   Password: admin123"
echo ""
echo "🌐 Access application at: http://localhost:4000"
