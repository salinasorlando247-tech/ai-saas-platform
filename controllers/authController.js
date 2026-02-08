import express from 'express';
import User from '../models/User.js';
import { generateToken, verifyToken } from '../services/authService.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.json({ token, userId: user._id });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(user && await user.matchPassword(password)){
    const token = generateToken(user._id);
    res.json({ token, userId: user._id });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Verify JWT
router.get('/verify', verifyToken, (req,res) => {
  res.json({ message: 'Token valid', userId: req.userId });
});

export default router;
