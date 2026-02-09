import express from 'express';
import { registerUser, loginUser } from '../helpers/authHelper.js';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json(token);
  } catch (err) {
    console.error('Login error:', err);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;
