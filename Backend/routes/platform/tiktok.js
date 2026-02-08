import express from 'express';
import axios from 'axios';
import { verifyJWT } from '../../middleware/auth.js';

const router = express.Router();

// Step 1: Exchange OAuth code for access token
router.post('/oauth', async (req, res) => {
  try {
    const { code } = req.body;
    const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Step 2: Upload video
router.post('/upload', verifyJWT, async (req, res) => {
  try {
    const { videoUrl, caption, accessToken } = req.body;
    const uploadRes = await axios.post(`https://open-api.tiktok.com/video/upload/`, {
      video_url: videoUrl,
      caption,
      access_token: accessToken,
    });
    res.json(uploadRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
