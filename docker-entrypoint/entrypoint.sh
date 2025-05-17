#!/bin/sh

echo "Start Creating Database tables"
# Create Database tables
npm run prisma:migrate:prod
echo "Creating Database tables finished"

# Execute the main command
exec "$@"