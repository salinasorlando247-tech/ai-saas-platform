import { aiVideoService } from '../services/aiVideoService.js';

export const autoCreateToggle = async (req, res) => {
  try {
    const { userId, enabled } = req.body;
    await aiVideoService.setAutoCreate(userId, enabled);
    res.status(200).json({ success: true, enabled });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to toggle auto-create' });
  }
};

export const getAutoCreateStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const status = await aiVideoService.getAutoCreateStatus(userId);
    res.status(200).json({ enabled: status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to get auto-create status' });
  }
};

export const predictEngagement = async (req, res) => {
  try {
    const { userId } = req.params;
    const predictedIncrease = await aiVideoService.getPredictedEngagement(userId);
    res.status(200).json({ predictedIncrease }); // e.g., 12%
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to predict engagement' });
  }
};
