# =============================================================
# Calling Server - Production Dockerfile
# Context must be repository root: docker build -f calling-server/Dockerfile .
# =============================================================
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY calling-server/package*.json ./calling-server/

WORKDIR /app/calling-server
RUN npm ci --omit=dev || npm install --omit=dev

WORKDIR /app
COPY resources ./resources
COPY calling-server ./calling-server

WORKDIR /app/calling-server

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["node", "server.js"]
