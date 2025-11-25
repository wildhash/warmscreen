#!/bin/bash

echo "🔥 Quick Start - Killing ports and starting servers..."

# Kill processes on ports
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3002 2>/dev/null | xargs kill -9 2>/dev/null || true

# Clean lock
rm -rf /workspaces/warmscreen/apps/web/.next/dev/lock 2>/dev/null || true

# Start
cd /workspaces/warmscreen && npm run dev
