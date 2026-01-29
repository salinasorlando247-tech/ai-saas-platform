import express from "express";

let queue = [
  { id: 1, title: "Sample Post", status: "pending", platforms: ["YouTube"] },
];

const router = express.Router();

// Get queue
router.get("/", (req, res) => res.json(queue));

// Post now
router.post("/post", (req, res) => {
  const { postId, platforms } = req.body;
  const post = queue.find((p) => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.status = "posted";
  post.platforms = platforms;
  res.json({ success: true });
});

export default router;
