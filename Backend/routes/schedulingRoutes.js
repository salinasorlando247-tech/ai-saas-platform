import express from "express";
import { scheduleVideo, publishVideo } from "../controllers/schedulingController.js";

const router = express.Router();
router.post("/schedule", scheduleVideo);
router.post("/publish", publishVideo);

export default router;
