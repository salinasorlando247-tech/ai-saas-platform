-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  is_beta BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  prompt TEXT,
  status TEXT DEFAULT 'queued',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investor / Metrics table
CREATE TABLE IF NOT EXISTS investor_stats (
  id SERIAL PRIMARY KEY,
  total_users INT DEFAULT 0,
  total_videos INT DEFAULT 0,
  total_revenue DECIMAL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example: add referral system
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by INT REFERENCES users(id);
