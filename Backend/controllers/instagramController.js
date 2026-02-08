// controllers/instagramController.js
import axios from "axios";

export const uploadMedia = async (req, res) => {
  const { videoUrl, caption, accessToken, pageId } = req.body;
  try {
    const response = await axios.post(
      `https://graph-video.facebook.com/${pageId}/videos`,
      { file_url: videoUrl, description: caption, access_token: accessToken }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
