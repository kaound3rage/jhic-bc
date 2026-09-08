# syntax=docker/dockerfile:1

# ---------- Stage 1: Build aplikasi (React + Vite) ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy file dependency dulu agar layer cache efektif
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code lalu build (hasil: /app/dist)
COPY . .
RUN npm run build

# ---------- Stage 2: Serve hasil build dengan Nginx di port 3000 ----------
FROM nginx:stable-alpine

# Hapus konten default nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build Vite dari stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Konfigurasi nginx custom (listen port 3000 + SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
