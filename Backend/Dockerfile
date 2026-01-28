# Node.js 20 LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend code
COPY . .

# Expose port
EXPOSE 5000

# Start backend
CMD ["node", "index.js"]
