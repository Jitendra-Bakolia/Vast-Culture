# =============================================================
# Job Server - Production Dockerfile
# Context must be repository root: docker build -f job-server/Dockerfile .
# =============================================================
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY job-server/package*.json ./job-server/

WORKDIR /app/job-server
RUN npm ci --omit=dev || npm install --omit=dev

WORKDIR /app
COPY resources ./resources
COPY job-server ./job-server

WORKDIR /app/job-server

EXPOSE 9000

ENV NODE_ENV=production
ENV PORT=9000

CMD ["node", "server.js"]
