// videoController.js
const { aiVideoService } = require("../services/aiVideoService");

const createVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const videoData = req.body;
    const result = await aiVideoService.createVideo(userId, videoData);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("createVideo Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const editVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const videoData = req.body;
    const result = await aiVideoService.editVideo(userId, videoData);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("editVideo Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const scheduleVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const scheduleData = req.body;
    const result = await aiVideoService.scheduleVideo(userId, scheduleData);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("scheduleVideo Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createVideo, editVideo, scheduleVideo };
