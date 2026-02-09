import express from "express";
import { db } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { videoId, client_feedback, ai_action_taken } = req.body;

    await db.query(
      "INSERT INTO ai_feedback (video_id, client_feedback, ai_action_taken) VALUES (?, ?, ?)",
      [videoId, client_feedback, JSON.stringify(ai_action_taken)]
    );

    res.json({ success: true, message: "Feedback recorded and AI updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record feedback" });
  }
});

export default router;
