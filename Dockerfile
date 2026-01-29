# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy only package files first for faster caching
COPY Backend/package*.json ./
RUN npm install --omit=dev

# Copy the backend code
COPY Backend/ ./

EXPOSE 5000

CMD ["node", "index.js"]
