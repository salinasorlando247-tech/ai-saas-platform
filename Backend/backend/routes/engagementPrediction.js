import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const predictedEngagement = Math.floor(Math.random() * 100);
  res.json({ predictedEngagement });
});

export default router;
