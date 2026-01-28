# Use official Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json from inner Backend and install dependencies
COPY Backend/Backend/package*.json ./
RUN npm install --omit=dev

# Copy all backend source code from inner Backend into container
COPY Backend/Backend/ ./

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]
