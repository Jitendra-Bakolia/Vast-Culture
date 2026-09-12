# =============================================================
# Core API Server - Production Dockerfile
# Context must be repository root: docker build -f server/Dockerfile .
# =============================================================
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY server/package*.json ./server/

# Install production dependencies
WORKDIR /app/server
RUN npm ci --omit=dev || npm install --omit=dev

# Copy shared resources and server source code
WORKDIR /app
COPY resources ./resources
COPY server ./server

WORKDIR /app/server

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server.js"]
