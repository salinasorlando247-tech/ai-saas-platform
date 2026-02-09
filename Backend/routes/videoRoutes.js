import express from 'express';
import { createVideo, editVideo, getVideoStatus } from '../helpers/videoHelper.js';

const router = express.Router();

// Create new video job
router.post('/create', async (req, res) => {
  try {
    const result = await createVideo(req.body);
    res.json(result);
  } catch (err) {
    console.error('Video creation error:', err);
    res.status(500).json({ error: 'Video creation failed' });
  }
});

// Edit existing video job
router.post('/edit', async (req, res) => {
  try {
    const result = await editVideo(req.body);
    res.json(result);
  } catch (err) {
    console.error('Video edit error:', err);
    res.status(500).json({ error: 'Video edit failed' });
  }
});

// Get status of a video job
router.get('/status/:videoId', async (req, res) => {
  try {
    const result = await getVideoStatus(req.params.videoId);
    res.json(result);
  } catch (err) {
    console.error('Video status error:', err);
    res.status(500).json({ error: 'Failed to fetch video status' });
  }
});

export default router;
