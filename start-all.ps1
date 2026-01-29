# Stop and remove old containers
$containers = @("nodetest-backend","nodetest-frontend")
foreach ($c in $containers) {
    $exists = docker ps -a --filter "name=$c" --format "{{.Names}}"
    if ($exists -eq $c) {
        Write-Host "Removing old container: $c"
        docker rm -f $c
    }
}

# Remove dangling images
docker system prune -f

# Build and run containers
docker-compose up --build -d

# Wait a few seconds
Start-Sleep -Seconds 10

# Open frontend in browser
Start-Process "http://localhost"

Write-Host "Frontend: http://localhost"
Write-Host "Backend: http://localhost:5000"
