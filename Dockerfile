# Use full Node image to avoid npm install errors
FROM node:18

WORKDIR /app

# Copy package.json first
COPY Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend code
COPY Backend/ ./

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "index.js"]
