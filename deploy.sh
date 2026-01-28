#!/bin/bash

echo "Starting AI SaaS deployment..."

# Stop existing containers
docker compose down

# Build and start containers
docker compose build
docker compose up -d

echo "Deployment complete!"
