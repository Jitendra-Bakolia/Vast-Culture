# Vast Culture — Docker & Containerization Guide

This project is fully containerized and architected for microservices, multi-server backends, and multi-database expansion.

---

## Quick Start (Production Mode via Nginx)

Run the client in a lightweight, high-performance production Nginx container:

```bash
# Build and run containers in background
docker compose up -d --build

# View container status
docker compose ps

# View live logs
docker compose logs -f client

# Stop containers
docker compose down
```

The web application will be accessible at: **`http://localhost:3000`**

---

## Development Mode (With Hot Reloading & Ngrok Live Tunnel)

For local development with Hot Module Replacement (HMR) and an **automatic public ngrok tunnel** exposing port 3000:

```bash
# Start development container with hot-reload and ngrok tunnel
docker compose -f docker-compose.dev.yml up --build
```

### What Happens on Development Start:
1. **`client`**: Starts the Vite dev server with volume mounts so your local code edits update instantly.
2. **`ngrok`**: Automatically connects to the ngrok cloud and tunnels `http://client:3000`.
3. **`ngrok-url`**: Queries the tunnel API and prints your live public URL in the logs:

```text
======================================================================
  🚀 [VAST CULTURE DEVELOPMENT TUNNEL ACTIVE]
  🌐 LIVE PUBLIC NGROK URL : https://xxxx-xxxx.ngrok-free.app
  📊 WEB INSPECTOR         : http://localhost:4041
  🔌 FORWARDING TO         : http://client:3000
======================================================================
```

### How to Keep the Exact Same Ngrok Public URL Every Time (Permanent Static Domain):

By default, ngrok generates a new random URL every time you restart Docker. To make the URL **permanent and never change**:

1. Log into your ngrok account at **[https://dashboard.ngrok.com/domains](https://dashboard.ngrok.com/domains)**.
2. Click **"New Domain"** or copy your **1 Free Static Domain** (e.g. `your-domain.ngrok-free.app`).
3. Open [.env](file:///home/agami-l55/j-soft/Vast-Culture/.env) and set your domain:
   ```bash
   NGROK_DOMAIN=your-domain.ngrok-free.app
   ```
4. Start Docker again:
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```
   Ngrok will now use that exact same permanent URL every single time!

### Inspecting Ngrok Traffic:
- Open **`http://localhost:4041`** in your browser to inspect incoming HTTP requests, headers, and responses in real-time.

### Stopping Development:
```bash
docker compose -f docker-compose.dev.yml down
```

---

## Architecture Overview

```
Vast-Culture/
├── docker-compose.yml              # Root orchestrator (Client + Multi-Server Network)
├── docker-compose.dev.yml          # Development orchestrator (Client HMR + Ngrok Tunnel)
├── .env.docker.example             # Template for Docker environment variables (Tokens, Ports)
├── .dockerignore                   # Build context exclusions
├── DOCKER.md                       # Operations documentation
└── client/
    ├── Dockerfile                  # Multi-stage production build (Node 22 -> Nginx Alpine)
    ├── Dockerfile.dev              # Development build with Vite hot reload (HMR)
    ├── nginx.conf                  # Production SPA routing, caching, gzip & API reverse proxy
    ├── vite.config.js              # Vite config with allowedHosts for ngrok tunnels
    └── .dockerignore               # Client context exclusions (node_modules, dist)
```

### Highlights:
1. **Multi-Stage Production Build**:
   - Compiles Vite assets with `node:22-alpine`.
   - Deploys static files to `nginx:alpine-slim` for a container footprint under **~20 MB**.
2. **SPA Routing**:
   - Nginx handles client-side routing fallback (`try_files $uri $uri/ /index.html;`) so page refreshes never throw 404s.
3. **Integrated Ngrok Tunneling**:
   - Out-of-the-box public URL generation for testing on physical mobile phones, sharing with clients/colleagues, and testing webhooks.
   - Vite `allowedHosts: true` avoids host header rejections.
4. **Shared Docker Network (`vast-culture-network`)**:
   - Containers communicate internally using service names (e.g., `http://client:3000`, `http://api-gateway:5000`, `postgres:5432`, `http://ngrok:4040`).

---

## Adding Future Backend Servers & Databases

When you are ready to add backend servers (Node/Express, Python, Go) or databases:

1. **Backend Server Service**:
   Uncomment the `api-gateway` block in [docker-compose.yml](file:///home/agami-l55/j-soft/Vast-Culture/docker-compose.yml) and set its build context to your server folder (e.g., `./server`).
2. **Database Services**:
   Uncomment `postgres`, `mongodb`, or `redis` blocks in [docker-compose.yml](file:///home/agami-l55/j-soft/Vast-Culture/docker-compose.yml).
3. **Nginx API Proxy**:
   In [client/nginx.conf](file:///home/agami-l55/j-soft/Vast-Culture/client/nginx.conf), uncomment the `location /api/` block to route `/api/*` requests to your backend without CORS issues.

---

## Helpful Docker Commands

| Action | Command |
| :--- | :--- |
| **Start production in background** | `docker compose up -d` |
| **Rebuild production & start** | `docker compose up -d --build` |
| **Start development with ngrok** | `docker compose -f docker-compose.dev.yml up` |
| **Start development in background** | `docker compose -f docker-compose.dev.yml up -d` |
| **View development live ngrok URL** | `docker compose -f docker-compose.dev.yml logs ngrok-url` |
| **Check container health** | `docker compose ps` |
| **Stop development containers** | `docker compose -f docker-compose.dev.yml down` |
| **Stop production containers** | `docker compose down` |
