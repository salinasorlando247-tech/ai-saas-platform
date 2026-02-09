import express from 'express';
import { connectPlatform, refreshToken, postVideo } from '../controllers/platformController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/connect', protect, connectPlatform);
router.post('/refresh', protect, refreshToken);
router.post('/post', protect, postVideo);

export default router;
