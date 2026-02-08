import express from "express";
import {
  generateVideo,
  likeVideo,
  dislikeVideo,
  editVideo,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateVideo);
router.post("/like/:videoId", likeVideo);
router.post("/dislike/:videoId", dislikeVideo);
router.post("/edit/:videoId", editVideo);

export default router;
