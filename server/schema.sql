CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL
);

CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  location VARCHAR(200)
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  hotel_id INT REFERENCES hotels(id) ON DELETE CASCADE,
  name VARCHAR(100),
  price_per_night NUMERIC(10,2),
  capacity INT
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  room_id INT REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT chk_dates CHECK (check_out > check_in)
);
