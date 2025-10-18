// server/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // tus rutas de login/register

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // permite conexión desde Vite
app.use(express.json()); // parsea JSON en POST requests

// Rutas API
app.use('/api', authRoutes);

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, '../client/dist')));

// Todas las rutas que no son API van a React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
