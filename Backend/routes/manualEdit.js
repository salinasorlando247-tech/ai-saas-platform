import express from "express";
import { db } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { logAIAction } from "../middlewares/aiMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, logAIAction, async (req, res) => {
  try {
    const { videoId, edits } = req.body;

    await db.query(
      "INSERT INTO ai_edits (video_id, edit_type, details) VALUES (?, ?, ?)",
      [videoId, "manual", JSON.stringify(edits)]
    );

    res.json({ success: true, message: "Manual edits saved and applied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to apply manual edits" });
  }
});

export default router;
