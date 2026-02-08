import express from 'express';
import scheduleService from '../services/scheduleService.js';

const router = express.Router();

// Schedule a post
router.post('/create', async (req,res) => {
  const { userId, videoPath, caption, platforms, scheduledTime } = req.body;
  const result = await scheduleService.schedulePost(userId, videoPath, caption, platforms, scheduledTime);
  res.json(result);
});

// Fetch upcoming posts
router.get('/upcoming/:userId', async (req,res) => {
  const posts = await scheduleService.getUpcoming(req.params.userId);
  res.json(posts);
});

export default router;
