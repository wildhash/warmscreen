# 🚀 Quick Start Guide

## Running the Application

### Option 1: Clean Start (Recommended if ports are in use)
```bash
chmod +x start-dev.sh
npm run dev:clean
```

### Option 2: Regular Start
```bash
npm run dev
```

## If You Encounter Port Conflicts

If you see errors like `EADDRINUSE` or `Port already in use`:

1. **Stop all processes:**
   ```bash
   pkill -f "next dev"
   pkill -f "tsx watch"
   ```

2. **Free up ports:**
   ```bash
   fuser -k 3000/tcp
   fuser -k 3001/tcp
   ```

3. **Clean Next.js cache:**
   ```bash
   rm -rf apps/web/.next/dev/lock
   rm -rf apps/web/.next/cache
   ```

4. **Restart:**
   ```bash
   npm run dev
   ```

## Services

Once running, you'll have:
- **Web UI**: http://localhost:3000 (or 3002 if 3000 is busy)
- **API**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Troubleshooting

### Network Error in Browser
The app is now configured with API proxy. If you still see network errors:
1. Check that the API is running: `curl http://localhost:3001/health`
2. Verify the web server is running on the correct port
3. Restart both services with `npm run dev:clean`

### Database Connection Issues
```bash
docker-compose up -d
npm run db:push
```

### Port 3000 Already in Use
Next.js will automatically use port 3002. Update your browser URL accordingly.
