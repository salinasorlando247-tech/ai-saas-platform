import express from 'express';
import { analyzeCompetitors, updateStrategies } from '../controllers/competitorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/analyze', protect, analyzeCompetitors);
router.post('/update', protect, updateStrategies);

export default router;
