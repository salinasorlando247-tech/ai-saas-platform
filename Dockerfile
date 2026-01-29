# Use slim version to prevent npm install failures
FROM node:18-slim

WORKDIR /app

# Copy only package files first
COPY Backend/package*.json ./

# Install all dependencies
RUN npm install

# Copy backend source code
COPY Backend/ ./

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "index.js"]
