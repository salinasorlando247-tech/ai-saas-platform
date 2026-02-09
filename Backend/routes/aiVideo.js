import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { aiVideoController } from '../controllers/aiVideoController.js';

const router = express.Router();

// Toggle Auto-Create ON/OFF
router.post('/auto-create-toggle', authMiddleware, aiVideoController.autoCreateToggle);

// Get current Auto-Create status
router.get('/auto-create-status/:userId', authMiddleware, aiVideoController.getAutoCreateStatus);

// Predict engagement for next auto-created videos
router.get('/predict-engagement/:userId', authMiddleware, aiVideoController.predictEngagement);

// Trigger AI video creation manually (for testing or manual override)
router.post('/create-video', authMiddleware, aiVideoController.createVideo);

// Multi-platform auto-posting endpoint
router.post('/auto-post', authMiddleware, aiVideoController.autoPost);

export default router;
