// controllers/youtubeController.js
import { google } from "googleapis";
const youtube = google.youtube("v3");

export const uploadVideo = async (req, res) => {
  const { title, description, filePath, accessToken } = req.body;
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const response = await youtube.videos.insert({
      auth,
      part: "snippet,status",
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus: "private" },
      },
      media: { body: require("fs").createReadStream(filePath) },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkStatus = async (req, res) => {
  const { videoId } = req.params;
  try {
    const response = await youtube.videos.list({
      part: "status",
      id: videoId,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
