require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// সব ইউজার
app.get('/users', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email FROM users ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// নতুন ইউজার
app.post('/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and email are required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email]
    );
    res
      .status(201)
      .json({ success: true, data: rows[0], message: 'User created successfully' });
  } catch (err) {
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists' });
    }
    next(err);
  }
});

// id validate korar middleware
function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid user id' });
  }
  req.userId = id;
  next();
}

// ekta user
app.get('/users/:id', validateId, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// edit
app.put('/users/:id', validateId, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and email are required' });
    }
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: rows[0], message: 'User updated successfully' });
  } catch (err) {
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists' });
    }
    next(err);
  }
});

// delete
app.delete('/users/:id', validateId, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
});
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(8000, () => console.log('Backend running on http://localhost:8000'));
