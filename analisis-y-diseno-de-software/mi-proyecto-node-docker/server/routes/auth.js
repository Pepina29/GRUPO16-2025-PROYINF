// server/routes/auth.js
import { Router } from 'express';
const router = Router();

// Simulación de base de datos
const users = [];

// Registro
router.post('/register', (req, res) => {
  const { rut, nombre, apellido, email, password } = req.body;
  if (!rut || !nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  users.push({ rut, nombre_cliente: nombre, apellido_cliente: apellido, email_cliente: email });
  res.json({ user: { rut, nombre_cliente: nombre, apellido_cliente: apellido, email_cliente: email } });
});

// Login
router.post('/login', (req, res) => {
  const { rut } = req.body;
  const user = users.find(u => u.rut === rut);
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });
  res.json({ user });
});

export default router;
