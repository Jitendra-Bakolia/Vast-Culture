# =============================================================
# Socket Server - Production Dockerfile
# Context must be repository root: docker build -f socket-server/Dockerfile .
# =============================================================
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY socket-server/package*.json ./socket-server/

WORKDIR /app/socket-server
RUN npm ci --omit=dev || npm install --omit=dev

WORKDIR /app
COPY resources ./resources
COPY socket-server ./socket-server

WORKDIR /app/socket-server

EXPOSE 7000

ENV NODE_ENV=production
ENV PORT=7000

CMD ["node", "server.js"]
