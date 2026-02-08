import express from "express";
import { aiVideoQueue } from "../queues/aiVideo.queue.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  const job = await aiVideoQueue.add("ai-video", {
    userId: req.user.id,
    ...req.body
  });

  res.json({
    jobId: job.id
  });
});

export default router;
