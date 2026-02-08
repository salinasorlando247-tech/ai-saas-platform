import express from "express";
import {
  uploadVideo,
  cutVideo,
  addClip,
  applyEffect,
  downloadVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", uploadVideo);
router.post("/cut", cutVideo);
router.post("/add-clip", addClip);
router.post("/apply-effect", applyEffect);
router.get("/download/:filename", downloadVideo);

export default router;
