import express from 'express';
import { postToPlatform } from '../services/platformService.js';

const router = express.Router();

// Post video to selected platforms
router.post('/post', async (req,res) => {
  const { videoPath, caption, platforms, token } = req.body;
  const results = [];
  for(const platform of platforms){
    const result = await postToPlatform(platform, videoPath, caption, token);
    results.push(result);
  }
  res.json({ results });
});

export default router;
