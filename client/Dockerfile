# =============================================================
# Stage 1: Build Stage (Node.js Alpine)
# =============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (leverages Docker layer cache)
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the production bundle with Vite
RUN npm run build

# =============================================================
# Stage 2: Production Server (Ultra-lightweight Nginx Alpine)
# =============================================================
FROM nginx:alpine-slim AS runner

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80 exposed inside the container
EXPOSE 80

# Built-in health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
