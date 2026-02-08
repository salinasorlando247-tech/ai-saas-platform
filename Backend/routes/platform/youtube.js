import express from 'express';
import { google } from 'googleapis';
import { verifyJWT } from '../../middleware/auth.js';

const router = express.Router();

router.post('/upload', verifyJWT, async (req, res) => {
  try {
    const { videoPath, title, description, accessToken } = req.body;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus: 'public' },
      },
      media: { body: require('fs').createReadStream(videoPath) },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
