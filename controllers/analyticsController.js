import Analytics from '../models/Analytics.js';
import { recordMetrics, getMetrics } from '../services/analyticsService.js';

export const recordAnalytics = async (req, res) => {
  try {
    await recordMetrics(req.body);
    res.json({ message: 'Metrics recorded' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const metrics = await getMetrics(req.params.videoId);
    res.json(metrics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
