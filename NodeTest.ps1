# -----------------------------
# PowerShell Script: start-multi-instance.ps1
# Multi-instance launcher: dynamic ports, backend wait, auto-launch
# -----------------------------

# ---------- Config ----------
$baseBackendPort = 5000
$baseFrontendPort = 80
$instanceNumber = Read-Host "Enter instance number (e.g., 1,2,3)"
$backendPort = $baseBackendPort + ($instanceNumber - 1)
$frontendPort = $baseFrontendPort + ($instanceNumber - 1)

Write-Host "🚀 Starting AI instance #$instanceNumber"
Write-Host "Backend Port: $backendPort, Frontend Port: $frontendPort" -ForegroundColor Cyan

# ---------- Git: Stage, commit, push ----------
Write-Host "`n📦 Staging all files..."
git add .

$commitMessage = "Full commit: instance $instanceNumber, stage all files, fix U/M status"
Write-Host "✍️ Committing changes: $commitMessage"
git commit -m $commitMessage

Write-Host "⬆️ Pushing to remote..."
git push

# ---------- Docker: Stop only conflicting containers ----------
Write-Host "`n🛑 Stopping any containers using backend port $backendPort or frontend port $frontendPort..."
$conflictingContainers = docker ps -q --filter "publish=$backendPort" + docker ps -q --filter "publish=$frontendPort"
if ($conflictingContainers) {
    docker stop $conflictingContainers
    docker rm $conflictingContainers
}

# ---------- Docker: Prune unused volumes ----------
Write-Host "🗑 Removing unused Docker volumes..."
docker volume prune -f

# ---------- Docker: Build & run ----------
Write-Host "🔧 Building and starting Docker containers for this instance..."
# Pass ports dynamically to docker-compose
docker-compose up --build -d

# ---------- Wait for backend ----------
$backendUrl = "http://localhost:$backendPort"
Write-Host "`n⏳ Waiting for backend to be ready at $backendUrl..."
while ($true) {
    try {
        $response = Invoke-WebRequest -Uri $backendUrl -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Backend is ready!"
            break
        }
    } catch {
        Write-Host "Waiting for backend..." -NoNewline
        Start-Sleep -Seconds 2
    }
}

# ---------- Launch frontend ----------
$frontendUrl = "http://localhost:$frontendPort"
Write-Host "`n🌐 Opening frontend at $frontendUrl..."
Start-Process $frontendUrl

# ---------- Show running containers ----------
Write-Host "`n📦 Current Docker containers:"
docker ps

Write-Host "`n🎉 Instance #$instanceNumber setup complete! Backend: $backendPort | Frontend: $frontendPort" -ForegroundColor Green
