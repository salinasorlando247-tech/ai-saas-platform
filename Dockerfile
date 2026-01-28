# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY Backend/package*.json ./

# Install dependencies (omit dev)
RUN npm install --omit=dev

# Copy all backend source code into container
COPY Backend/ ./

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
