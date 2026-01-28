// Backend/routes/createPost.js
import express from "express";
import { db } from "../index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await db.read();
  const { title, content } = req.body;
  const newPost = {
    id: db.data.posts.length + 1,
    title,
    content
  };
  db.data.posts.push(newPost);
  await db.write();
  res.json({ success: true, post: newPost });
});

export default router;
