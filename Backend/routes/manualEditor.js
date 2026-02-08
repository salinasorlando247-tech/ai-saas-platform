import express from 'express';
import { uploadVideo, editVideo, approveVideo, regenerateVideo } from '../controllers/manualEditorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadVideo);
router.post('/edit', protect, editVideo);
router.post('/approve', protect, approveVideo);
router.post('/regenerate', protect, regenerateVideo);

export default router;
