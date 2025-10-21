# ─── Stage 1: Build & Compress ───────────────────────────────────────────────
FROM node:21-alpine AS builder

# install brotli for compression
RUN apk add --no-cache brotli

WORKDIR /app

# install deps (including vite in devDeps)
COPY package*.json ./
RUN npm ci --silent

# copy source & run Vite build (outputs into /app/build)
COPY . .
RUN npm run build

# inspect to verify you have /app/build
RUN ls -R /app/build

# brotli‑compress every file under build/
RUN find /app/build -type f -exec brotli --best {} \;

# ─── Stage 2: Serve with Nginx ───────────────────────────────────────────────
FROM nginx:alpine

# enable brotli & gzip
RUN apk add --no-cache brotli nginx-mod-http-brotli

# copy your custom nginx config
#COPY nginx.conf /etc/nginx/http.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# grab the compressed build output
COPY --from=builder /app/build /usr/share/nginx/html/crm/agent

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
