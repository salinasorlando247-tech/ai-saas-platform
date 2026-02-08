import Schedule from '../models/Schedule.js';
import { scheduleVideoService } from '../services/schedulingService.js';

export const scheduleVideo = async (req, res) => {
  try {
    const schedule = await scheduleVideoService(req.user._id, req.body);
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSchedules = async (req, res) => {
  const schedules = await Schedule.find({ user: req.user._id });
  res.json(schedules);
};
