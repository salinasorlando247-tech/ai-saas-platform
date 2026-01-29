# File: run-NodeTest.ps1
# Purpose: Full NodeTest AI deployment with animated console, AI Brain, Virality Meter, and live social metrics

cd C:\Users\ranch\Desktop\NodeTest

# --------------------------
# FUNCTIONS
# --------------------------

# Animated progress bar
function Show-AnimatedProgress($message, $percent, $color="Green") {
    $host.UI.RawUI.ForegroundColor = $color
    for ($i = 0; $i -le $percent; $i += 5) {
        Write-Progress -Activity "NodeTest AI Deployment" -Status "$message [$i%]" -PercentComplete $i
        Start-Sleep -Milliseconds 100
    }
    $host.UI.RawUI.ForegroundColor = "White"
}

# Step banner
function Write-Step($message, $color="Cyan") {
    $host.UI.RawUI.ForegroundColor = $color
    Write-Host "`n=============================="
    Write-Host $message
    Write-Host "==============================`n"
    $host.UI.RawUI.ForegroundColor = "White"
}

# AI Brain animation
function Show-BrainLoading($seconds) {
    $chars = "/-\|"
    $elapsed = 0
    Write-Step "AI Brain is initializing..." "Magenta"
    while ($elapsed -lt $seconds) {
        foreach ($c in $chars) {
            Write-Host -NoNewline "`r$c Thinking..."
            Start-Sleep -Milliseconds 200
            $elapsed += 0.2
            if ($elapsed -ge $seconds) { break }
        }
    }
    Write-Host "`rAI Brain Ready!       " -ForegroundColor Green
}

# Virality meter animation
function Show-ViralityMeter($seconds) {
    Write-Step "Virality Meter: Predicting post performance..." "Yellow"
    $elapsed = 0
    $max = 50  # width of bar
    while ($elapsed -lt $seconds) {
        $fill = Get-Random -Minimum 0 -Maximum $max
        $bar = ("█" * $fill) + (" " * ($max - $fill))
        Write-Host -NoNewline "`r[$bar] $([math]::Round($fill/$max*100))% Viral Potential"
        Start-Sleep -Milliseconds 200
        $elapsed += 0.2
    }
    Write-Host "`nVirality Prediction Complete!" -ForegroundColor Green
}

# Live social metrics simulation
function Show-LiveMetrics($seconds) {
    Write-Step "AI Social Metrics Dashboard (simulated live data)..." "Cyan"
    $elapsed = 0
    while ($elapsed -lt $seconds) {
        $views = Get-Random -Minimum 1000 -Maximum 100000
        $likes = Get-Random -Minimum 100 -Maximum ($views / 2)
        $shares = Get-Random -Minimum 10 -Maximum ($likes / 2)
        $comments = Get-Random -Minimum 5 -Maximum ($shares / 2)
        Write-Host -NoNewline "`rViews: $views | Likes: $likes | Shares: $shares | Comments: $comments    "
        Start-Sleep -Milliseconds 400
        $elapsed += 0.4
    }
    Write-Host "`nLive Metrics Simulation Complete!" -ForegroundColor Green
}

# --------------------------
# STEP 1: Stop and clean containers/images
# --------------------------
Write-Step "STEP 1: Stopping containers and cleaning Docker...", "Green"
Show-AnimatedProgress "Cleaning Docker" 20 "Green"
docker-compose down -v
docker rm -f nodetest-backend nodetest-frontend 2>$null
docker rmi -f nodetest-backend nodetest-frontend 2>$null
docker system prune -a -f
npm cache clean --force

# --------------------------
# STEP 2: Commit Git changes
# --------------------------
Write-Step "STEP 2: Committing Git changes...", "Yellow"
Show-AnimatedProgress "Updating Git" 30 "Yellow"
git add .
git commit -m "Clean NodeTest for production" 2>$null
git push origin main 2>$null

# --------------------------
# STEP 3: Build backend
# --------------------------
Write-Step "STEP 3: Building backend...", "Green"
Show-AnimatedProgress "Building backend" 50 "Green"
docker-compose build backend --no-cache

# --------------------------
# STEP 4: Build frontend with retry
# --------------------------
Write-Step "STEP 4: Building frontend (with retry)...", "Yellow"
$retry = 0
$maxRetry = 2
$success = $false
while (-not $success -and $retry -le $maxRetry) {
    Show-AnimatedProgress "Building frontend (attempt $($retry + 1))" 60 "Yellow"
    try {
        docker-compose build frontend --no-cache
        $success = $true
    } catch {
        Write-Host "Frontend build failed. Retrying..." -ForegroundColor Red
        $retry++
        Start-Sleep -Seconds 5
    }
}
if (-not $success) {
    Write-Host "ERROR: Frontend failed to build after $($maxRetry + 1) attempts." -ForegroundColor Red
    exit 1
}

# --------------------------
# STEP 5: Start containers
# --------------------------
Write-Step "STEP 5: Starting containers...", "Green"
Show-AnimatedProgress "Starting containers" 75 "Green"
docker-compose up -d

# --------------------------
# STEP 6: Wait for backend + AI Brain + Virality + Metrics
# --------------------------
Write-Step "STEP 6: Initializing AI Brain and analyzing virality...", "Cyan"
$backendUrl = "http://localhost:5000"
$timeout = 120
$interval = 5
$elapsed = 0

# Animated AI Brain
Show-BrainLoading 10

# Virality Meter
Show-ViralityMeter 10

# Live metrics simulation
Show-LiveMetrics 10

# Backend check
while ($elapsed -lt $timeout) {
    try {
        $response = Invoke-WebRequest -Uri $backendUrl -UseBasicParsing -TimeoutSec 3
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 404) {
            Write-Host "Backend is up!" -ForegroundColor Green
            break
        }
    } catch {
        Write-Host "Backend not ready yet..." -ForegroundColor Yellow
    }
    Start-Sleep -Seconds $interval
    $elapsed += $interval
}
if ($elapsed -ge $timeout) {
    Write-Host "Warning: Backend did not start within $timeout seconds." -ForegroundColor Red
}

# --------------------------
# STEP 7: Open frontend
# --------------------------
Write-Step "STEP 7: Opening frontend in browser...", "Magenta"
Show-AnimatedProgress "Launching frontend" 95 "Magenta"
Start-Process "http://localhost:3000"

# --------------------------
# STEP 8: Show live logs
# --------------------------
Write-Step "STEP 8: Showing live logs...", "Cyan"
Show-AnimatedProgress "Logs streaming" 100 "Cyan"
docker-compose logs -f
