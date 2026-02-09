import express from "express";
import { db } from "../index.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  await db.read();
  res.json(db.data.posts);
});

// Create a new post
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  await db.read();
  const newPost = { id: Date.now(), title, content };
  db.data.posts.push(newPost);
  await db.write();
  res.json({ success: true, post: newPost });
});

export default router;
