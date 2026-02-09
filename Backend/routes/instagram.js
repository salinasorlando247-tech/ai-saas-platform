// routes/instagram.js
import express from "express";
import { uploadMedia } from "../controllers/instagramController.js";
const router = express.Router();

router.post("/upload", uploadMedia);

export default router;
