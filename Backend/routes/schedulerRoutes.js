import express from "express";
import { scheduleVideo, bulkSchedule } from "../controllers/schedulerController.js";

const router = express.Router();

router.post("/single", scheduleVideo);
router.post("/bulk", bulkSchedule);

export default router;
