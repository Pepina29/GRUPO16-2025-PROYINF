FROM node:18-alpine

WORKDIR /app/server

# copia solo el package.json y package-lock.json del backend
COPY server/package*.json ./
RUN npm install

# luego copia el resto del código del backend
COPY server .

RUN npm install -g wait-port

EXPOSE 3000
CMD ["sh", "-c", "wait-port postgres_db:5432 && node index.js"]
