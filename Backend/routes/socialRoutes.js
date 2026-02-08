import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  schedulePost,
  getMyPosts,
  postNow,
  bulkSchedulePosts
} from '../controllers/socialController.js';

const router = express.Router();

router.post('/schedule', protect, schedulePost);
router.get('/my', protect, getMyPosts);
router.post('/postnow/:id', protect, postNow);
router.post('/bulk-schedule', protect, bulkSchedulePosts);

export default router;
