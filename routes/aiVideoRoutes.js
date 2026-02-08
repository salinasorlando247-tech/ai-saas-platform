import express from "express";
import { createAIVideo, likeAIVideo, dislikeAIVideo } from "../controllers/aiVideoController.js";

const router = express.Router();

router.post("/generate", createAIVideo);
router.post("/like", likeAIVideo);
router.post("/dislike", dislikeAIVideo);

export default router;
