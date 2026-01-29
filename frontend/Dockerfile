# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies including dev (needed for build)
RUN npm install

# Copy everything else
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
