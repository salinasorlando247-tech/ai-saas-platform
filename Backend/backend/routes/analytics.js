import express from "express";
import { db } from "../../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await db.read();
  res.json(db.data.analytics);
});

router.post("/update", async (req, res) => {
  const { postId, likes, shares, comments } = req.body;

  await db.read();

  db.data.analytics.push({
    postId,
    likes,
    shares,
    comments
  });

  await db.write();

  res.json({ success: true });
});

export default router;
