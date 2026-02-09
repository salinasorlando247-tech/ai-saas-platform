// backend/routes/trends.js
import express from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "supersecretkey";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Fetch trends per user
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const [rows] = await db.query("SELECT * FROM trends WHERE user_id = ?", [userId]);
  res.json(rows);
});

export default router;
