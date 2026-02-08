// autoVideoController.js
const { videoQueue } = require("../forgeWorkflows");

// Auto-create video endpoint
const autoCreateVideo = async (req, res) => {
  try {
    const { userId } = req.user;
    const videoData = req.body;

    const job = await videoQueue.add("auto-create", { userId, videoData });
    res.json({ success: true, jobId: job.id });
  } catch (err) {
    console.error("autoCreateVideo Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Scheduled video endpoint
const scheduleVideo = async (req, res) => {
  try {
    const { userId } = req.user;
    const scheduleData = req.body;

    const job = await videoQueue.add("scheduled-post", { userId, videoData: scheduleData });
    res.json({ success: true, jobId: job.id });
  } catch (err) {
    console.error("scheduleVideo Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { autoCreateVideo, scheduleVideo };
