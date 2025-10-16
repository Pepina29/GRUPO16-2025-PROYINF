const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Importar la conexión
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir archivos HTML

// ===== RUTAS DE AUTENTICACIÓN =====

// Registro
app.post('/api/register', async (req, res) => {
  try {
    const { rut, nombre, apellido, email, password } = req.body;
    
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO usuario (rut_cliente, nombre_cliente, apellido_cliente, email, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING rut_cliente, nombre_cliente, apellido_cliente, email',
      [rut, nombre, apellido, email, hashedPassword]
    );
    
    res.json({
      success: true,
      message: 'Usuario registrado',
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'El RUT o email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { rut, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM usuario WHERE rut_cliente = $1',
      [rut]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
    }
    
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.contraseña);
    
    if (!isValid) {
      return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
    }
    
    // No enviar la contraseña
    delete user.contraseña;
    
    res.json({
      success: true,
      message: 'Login exitoso',
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login' });
  }
});

// ===== RUTAS DE PRUEBA =====

app.get('/save', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.send('Mensaje guardado en la base de datos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(port, () => {
  console.log(`🚀 App corriendo en http://localhost:${port}`);
});