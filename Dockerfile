FROM node:18

WORKDIR /app

# Install system dependencies required by ffmpeg and npm packages
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy only package files first (faster caching)
COPY Backend/package*.json ./

# Install npm dependencies
RUN npm install

# Copy backend code
COPY Backend/ ./

EXPOSE 5000

CMD ["node", "index.js"]
