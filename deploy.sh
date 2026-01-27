#!/bin/bash

echo "Deploying AI SaaS Platform..."

docker-compose down
docker-compose build
docker-compose up -d

echo "Deployment complete"
