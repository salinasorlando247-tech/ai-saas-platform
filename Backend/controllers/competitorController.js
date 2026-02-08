import Competitor from '../models/competitor.js';
import { fetchTopVideos, extractHighEngagementElements } from '../services/competitorService.js';

export const analyzeCompetitors = async (req, res) => {
  try {
    const competitors = await fetchTopVideos(req.user.industry);
    res.json(competitors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateStrategies = async (req, res) => {
  try {
    await extractHighEngagementElements(req.body.videos);
    res.json({ message: 'Competitor strategy updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
