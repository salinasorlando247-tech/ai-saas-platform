import express from 'express';
import { getAnalytics } from '../helpers/analyticsHelper.js';

const router = express.Router();

// Fetch analytics data
router.get('/', async (req, res) => {
  try {
    const metrics = await getAnalytics();
    res.json(metrics);
  } catch (err) {
    console.error('Analytics fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
