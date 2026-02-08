import express from "express";
import { db } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { videoId, platform, scheduled_time } = req.body;

    await db.query(
      "INSERT INTO ai_schedule (video_id, platform, scheduled_time) VALUES (?, ?, ?)",
      [videoId, platform, scheduled_time]
    );

    res.json({ success: true, message: "Video scheduled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to schedule video" });
  }
});

export default router;
