#!/bin/sh
set -e

# Check if DATABASE_URL is provided
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Navigate to Prisma package and run migrations
echo "Running database migrations..."
cd /usr/src/app/packages/db && npx prisma migrate deploy

# Start the backend application
echo "Starting backend..."
cd /usr/src/app/apps/backend && exec npm run start-backend