import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;

/**
 * Register new user
 */
export const registerUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const sql = 'INSERT INTO users(username, email, password) VALUES (?, ?, ?)';
  const [res] = await pool.execute(sql, [username, email, hashedPassword]);

  return { id: res.insertId, username, email };
};

/**
 * Login user and return JWT
 */
export const loginUser = async ({ email, password }) => {
  const sql = 'SELECT * FROM users WHERE email=?';
  const [rows] = await pool.execute(sql, [email]);
  const user = rows[0];

  if (!user) throw new Error('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

  return { token, user: { id: user.id, username: user.username, email: user.email } };
};
