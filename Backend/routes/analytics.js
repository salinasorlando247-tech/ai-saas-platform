import express from 'express';
import { recordAnalytics, getAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/record', protect, recordAnalytics);
router.get('/view/:videoId', protect, getAnalytics);

export default router;
