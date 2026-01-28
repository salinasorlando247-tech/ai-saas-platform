# Stop any running containers
docker-compose down

# Build and start backend + frontend in detached mode
docker-compose up --build -d

# Wait a few seconds for backend/frontend to be ready
Start-Sleep -Seconds 5

# Open frontend in default browser
Start-Process "http://localhost"
