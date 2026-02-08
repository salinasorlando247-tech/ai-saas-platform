// routes/auth.js
import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "YOUR_SECRET_KEY"; // replace with strong key

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashed,
    ]);

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (!rows.length) return res.status(400).json({ error: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
