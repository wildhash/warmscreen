#!/bin/bash

echo "🚀 Setting up WarmScreen..."

# Kill existing processes
echo "🧹 Cleaning up existing processes..."
pkill -9 -f "next dev" 2>/dev/null || true
pkill -9 -f "tsx watch" 2>/dev/null || true
lsof -ti:3000,3001,3002 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 2

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for database
echo "⏳ Waiting for database to be ready..."
sleep 5

# Setup database
echo "📦 Setting up database..."
cd /workspaces/warmscreen/packages/database
npm run db:push

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

# Clean Next.js cache
echo "🗑️  Cleaning Next.js cache..."
rm -rf /workspaces/warmscreen/apps/web/.next/dev/lock
rm -rf /workspaces/warmscreen/apps/web/.next/cache

# Start dev servers
echo "🚀 Starting development servers..."
cd /workspaces/warmscreen
npm run dev
