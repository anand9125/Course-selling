#!/bin/sh
set -e

# Check if DATABASE_URL is provided
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Run database migrations inside packages/db
echo "Running database migrations..."
cd /usr/src/app/packages/db && npx prisma migrate deploy

# Start both backend and worker processes
echo "Starting backend and worker..."

# Start backend in the background
cd /usr/src/app/apps/backend && npm run start &

# Start worker in the background
cd /usr/src/app/apps/worker && npm run start &

# Wait for both processes to prevent the container from exiting
wait
