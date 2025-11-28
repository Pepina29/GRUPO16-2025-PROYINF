// server/routes/auth.js
import { Router } from 'express';
import pool from '../../db.js';
import { formatearRut, validarRutJs } from "../utils/rut.js";

const router = Router();

/**
 * POST /api/register
 * body: { rut, nombre, apellido, email, password }
 */
router.post('/register', async (req, res) => {
  const { rut, nombre, apellido, email, password } = req.body || {};
  console.log(">>> RUT recibido desde frontend:", rut);
  if (!rut || !nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Validación completa: formato + DV
  console.log(">>> validarRutJs(21550326-7) =", validarRutJs("21550326-7"));
  
  if (!validarRutJs(rut)) {
    return res.status(400).json({
      error: "RUT inválido (formato o dígito verificador incorrecto)",
    });
  }

  // Normalizar formato
  const rutFormateado = formatearRut(rut);

  try {
    const sql = `
      INSERT INTO usuario (rut_cliente, nombre_cliente, apellido_cliente, email, contrasena)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING rut_cliente AS rut, nombre_cliente, apellido_cliente, email
    `;

    const params = [rutFormateado, nombre, apellido, email, password];
    const { rows } = await pool.query(sql, params);

    return res.status(201).json({ user: rows[0] });

  } catch (e) {

    if (e.code === '23505')
      return res.status(409).json({ error: 'RUT o email ya registrado' });

    if (String(e.message || '').includes('RUT_INVALIDO'))
      return res.status(400).json({ error: 'Dígito verificador incorrecto' });

    console.error('[register]', e);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * POST /api/login
 */
router.post('/login', async (req, res) => {
  const { rut, password } = req.body || {};
  
  if (!rut) return res.status(400).json({ error: 'Falta RUT' });
  if (!password) return res.status(400).json({ error: 'Falta contraseña' });

  if (!validarRutJs(rut)) {
    return res.status(400).json({ error: 'RUT inválido (formato o DV)' });
  }

  const rutFormateado = formatearRut(rut);

  try {
    const sql = `
      SELECT rut_cliente AS rut, nombre_cliente, apellido_cliente, email, contrasena
      FROM usuario
      WHERE rut_cliente = $1
    `;

    const { rows } = await pool.query(sql, [rutFormateado]);
    if (!rows.length) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = rows[0];

    if (user.contrasena !== password)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    delete user.contrasena;

    return res.json({ user });

  } catch (e) {
    console.error('[login]', e);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
