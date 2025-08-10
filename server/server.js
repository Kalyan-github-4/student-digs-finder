const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic routes
app.get('/api/rooms', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM rooms ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/rooms', async (req, res) => {
  const { name, price_per_night, capacity } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO rooms (name, price_per_night, capacity) VALUES ($1,$2,$3) RETURNING *',
      [name, price_per_night, capacity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Booking endpoint (simple overlap check inside transaction)
app.post('/api/bookings', async (req, res) => {
  const { user_id, room_id, check_in, check_out } = req.body;
  try {
    await pool.query('BEGIN');

    const { rows } = await pool.query(
      `SELECT COUNT(*) AS cnt FROM bookings
       WHERE room_id=$1 AND NOT (check_out <= $2 OR check_in >= $3)`,
      [room_id, check_in, check_out]
    );

    if (parseInt(rows[0].cnt, 10) > 0) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ error: 'Room already booked for those dates' });
    }

    const inserted = await pool.query(
      `INSERT INTO bookings (user_id, room_id, check_in, check_out)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [user_id, room_id, check_in, check_out]
    );

    await pool.query('COMMIT');
    res.status(201).json(inserted.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK').catch(() => {});
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
