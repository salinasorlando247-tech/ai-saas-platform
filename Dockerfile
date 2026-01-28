# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY Backend/package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY Backend/ ./Backend/

EXPOSE 5000

# Start server
CMD ["node", "Backend/Important/index.js"]
