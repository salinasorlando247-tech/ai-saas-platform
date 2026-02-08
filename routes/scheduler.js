// backend/routes/scheduler.js
import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET scheduled videos for a user
router.get("/user/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT s.*, v.title, v.platform 
       FROM scheduler s 
       JOIN videos v ON s.video_id = v.id 
       WHERE s.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching scheduler:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST schedule a video
router.post("/", authMiddleware, async (req, res) => {
  const { user_id, video_id, scheduled_time } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO scheduler (user_id, video_id, scheduled_time) VALUES (?, ?, ?)",
      [user_id, video_id, scheduled_time]
    );
    res.json({ message: "Video scheduled", schedulerId: result.insertId });
  } catch (err) {
    console.error("Error scheduling video:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
