# syntax=docker/dockerfile:1

########################
# Build
########################
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar deps del root (express, cors, pg están aquí)
COPY package*.json ./
RUN npm install

# Instalar deps de client y server (aprovecha caché)
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN cd client && npm install
RUN cd server && npm install

# Copiar código (incluye db.js en root)
COPY client ./client
COPY server ./server
COPY db.js ./db.js

# Build del front
RUN cd client && npm run build

########################
# Runtime
########################
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copiamos lo necesario
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/db.js ./db.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server/index.js"]
