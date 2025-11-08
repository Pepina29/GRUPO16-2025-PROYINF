// server/routes/auth.js
import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

/**
 * POST /register
 * body: { rut, nombre, apellido, email, password }
 * Devuelve: { user: { rut, nombre_cliente, apellido_cliente, email } }
 */
router.post('/register', async (req, res) => {
  const { rut, nombre, apellido, email, password } = req.body || {};
  if (!rut || !nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const sql = `
      INSERT INTO usuario (rut_cliente, nombre_cliente, apellido_cliente, email, contrasena)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING rut_cliente AS rut, nombre_cliente, apellido_cliente, email
    `;
    const params = [rut, nombre, apellido, email, password];
    const { rows } = await pool.query(sql, params);
    return res.status(201).json({ user: rows[0] });
  } catch (e) {
    // 23505 = unique_violation (RUT o email ya registrados)
    if (e.code === '23505') {
      return res.status(409).json({ error: 'RUT o email ya registrado' });
    }
    console.error('[register] ', e);
    return res.status(500).json({ error: 'Error interno' });
  }
});

/**
 * POST /login
 * body: { rut, password? }
 * Devuelve: { user } si existe (si envías password, la valida simple)
 */
router.post('/login', async (req, res) => {
  const { rut, password } = req.body || {};
  if (!rut) return res.status(400).json({ error: 'Falta rut' });

  try {
    const sql = `
      SELECT rut_cliente AS rut, nombre_cliente, apellido_cliente, email, contrasena
      FROM usuario
      WHERE rut_cliente = $1
    `;
    const { rows } = await pool.query(sql, [rut]);

    if (!rows.length) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = rows[0];

    // Si viene password, la comparamos simple (texto plano)
    if (typeof password === 'string' && user.contrasena !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    delete user.contrasena; // no exponerla
    return res.json({ user });
  } catch (e) {
    console.error('[login] ', e);
    return res.status(500).json({ error: 'Error interno' });
  }
});

export default router;
