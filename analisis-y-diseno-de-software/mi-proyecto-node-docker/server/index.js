// server/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas API
app.use('/api', authRoutes);

// Servir archivos estáticos de React - debe apuntar a la carpeta 'dist'
app.use(express.static(path.join(__dirname, '../client/dist')));

// Todas las rutas que no son API van a React
app.use((req, res, next) => {
  // Si la ruta no empieza con /api, sirve el index.html de la carpeta dist
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));