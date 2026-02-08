import express from 'express';
import { scheduleVideo, getSchedules } from '../controllers/schedulingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/schedule', protect, scheduleVideo);
router.get('/all', protect, getSchedules);

export default router;
