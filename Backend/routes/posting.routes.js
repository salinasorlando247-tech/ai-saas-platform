import express from "express";
import auth from "../middleware/auth.js";
import { postEverywhere } from "../services/postAllPlatforms.js";

const router = express.Router();

router.post("/auto-post", auth, async (req, res) => {
  const { videoUrl, caption, platforms } = req.body;

  await postEverywhere({
    videoUrl,
    caption,
    platforms,
    userTokens: req.user.tokens
  });

  res.json({ success: true, message: "Posting started" });
});

export default router;
