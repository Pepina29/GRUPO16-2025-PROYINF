// server/routes/simulations.js
import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

/** GET /api/simulations?rut=123  -> lista del usuario */
router.get('/', async (req, res) => {
  const rut = Number(req.query.rut);
  if (!rut) return res.status(400).json({ error: 'Falta rut' });

  try {
    const { rows } = await pool.query(
      `SELECT id, rut_cliente AS rut, data, created_at
       FROM user_simulation
       WHERE rut_cliente = $1
       ORDER BY created_at DESC`,
      [rut]
    );
    res.json({ simulations: rows });
  } catch (e) {
    console.error('[GET /simulations]', e);
    res.status(500).json({ error: 'Error interno' });
  }
});

/** GET /api/simulations/count?rut=123 */
router.get('/count', async (req, res) => {
  const rut = Number(req.query.rut);
  if (!rut) return res.status(400).json({ error: 'Falta rut' });

  try {
    const { rows } = await pool.query(
      'SELECT COUNT(*)::int AS count FROM user_simulation WHERE rut_cliente = $1',
      [rut]
    );
    res.json({ count: rows[0].count });
  } catch (e) {
    console.error('[GET /simulations/count]', e);
    res.status(500).json({ error: 'Error interno' });
  }
});

/** POST /api/simulations  body: { rut, data } */
router.post('/', async (req, res) => {
  const { rut, data } = req.body || {};
  if (!rut || !data) return res.status(400).json({ error: 'Faltan datos' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO user_simulation (rut_cliente, data)
       VALUES ($1, $2)
       RETURNING id, rut_cliente AS rut, data, created_at`,
      [rut, data]
    );
    res.status(201).json({ simulation: rows[0] });
  } catch (e) {
    if (String(e.message || '').includes('SIM_LIMIT_REACHED')) {
      return res.status(409).json({ error: 'limit' });
    }
    console.error('[POST /simulations]', e);
    res.status(500).json({ error: 'Error interno' });
  }
});

/** DELETE /api/simulations/:id?rut=123 */
router.delete('/:id', async (req, res) => {
  const rut = Number(req.query.rut);
  const { id } = req.params;
  if (!rut || !id) return res.status(400).json({ error: 'Falta rut o id' });

  try {
    const { rowCount } = await pool.query(
      `DELETE FROM user_simulation WHERE id = $1 AND rut_cliente = $2`,
      [id, rut]
    );
    if (!rowCount) return res.status(404).json({ error: 'No encontrada' });
    res.json({ ok: true });
  } catch (e) {
    console.error('[DELETE /simulations/:id]', e);
    res.status(500).json({ error: 'Error interno' });
  }
});

/** DELETE /api/simulations?rut=123  (todas) */
router.delete('/', async (req, res) => {
  const rut = Number(req.query.rut);
  if (!rut) return res.status(400).json({ error: 'Falta rut' });

  try {
    await pool.query(`DELETE FROM user_simulation WHERE rut_cliente = $1`, [rut]);
    res.json({ ok: true });
  } catch (e) {
    console.error('[DELETE /simulations]', e);
    res.status(500).json({ error: 'Error interno' });
  }
});

export default router;
