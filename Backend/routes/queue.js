import express from "express";
import { addJob } from "../models/queueModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add video job
router.post("/video", authMiddleware, async (req, res) => {
  try {
    const jobId = await addJob("VIDEO", req.body, 3);
    res.json({ success: true, jobId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to queue video job" });
  }
});

// Add scheduling job
router.post("/schedule", authMiddleware, async (req, res) => {
  try {
    const jobId = await addJob("SCHEDULE", req.body, 4);
    res.json({ success: true, jobId });
  } catch (err) {
    res.status(500).json({ error: "Failed to queue schedule job" });
  }
});

// Add analytics job
router.post("/analytics", authMiddleware, async (req, res) => {
  try {
    const jobId = await addJob("ANALYTICS", req.body, 2);
    res.json({ success: true, jobId });
  } catch (err) {
    res.status(500).json({ error: "Failed to queue analytics job" });
  }
});

export default router;
