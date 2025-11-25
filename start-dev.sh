#!/bin/bash

echo "🧹 Cleaning up existing processes..."
pkill -9 -f "next dev" 2>/dev/null || true
pkill -9 -f "tsx watch" 2>/dev/null || true
pkill -9 -f "node.*3001" 2>/dev/null || true
sleep 2

echo "🔓 Freeing up ports..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3002 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 1

echo "🗑️  Cleaning Next.js cache..."
rm -rf /workspaces/warmscreen/apps/web/.next/dev/lock
rm -rf /workspaces/warmscreen/apps/web/.next/cache

echo "🚀 Starting development servers..."
cd /workspaces/warmscreen && npm run dev
