# Dockerfile
FROM node:18

WORKDIR /app

# 1. Copiar TODOS los package.json primero
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# 2. Instalar dependencias del ROOT (si existen)
RUN npm install || true

# 3. Instalar dependencias del CLIENT
WORKDIR /app/client
RUN npm install

# 4. Instalar dependencias del SERVER
WORKDIR /app/server
RUN npm install

# 5. Volver al root y copiar TODO el código
WORKDIR /app
COPY . .

# 6. Hacer el build desde la carpeta client
WORKDIR /app/client
RUN npm run build

# 7. Verificar que el build se creó (para debug)
RUN ls -la dist/

# 8. Volver al root
WORKDIR /app

# Exponer puerto
EXPOSE 3000

# Iniciar servidor
CMD ["npm", "start"]