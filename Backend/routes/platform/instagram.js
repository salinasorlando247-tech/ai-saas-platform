import express from 'express';
import axios from 'axios';
import { verifyJWT } from '../../middleware/auth.js';

const router = express.Router();

// Upload to Instagram/Facebook page
router.post('/upload', verifyJWT, async (req, res) => {
  try {
    const { pageId, videoUrl, caption, accessToken } = req.body;
    const createMedia = await axios.post(
      `https://graph.facebook.com/v17.0/${pageId}/videos`,
      { file_url: videoUrl, description: caption, access_token: accessToken }
    );
    res.json(createMedia.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
