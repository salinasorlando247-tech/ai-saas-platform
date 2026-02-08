import VideoJob from '../models/VideoJob.js';

const schedulePost = async (userId, videoPath, caption, platforms, scheduledTime) => {
  const job = await VideoJob.create({ userId, videoPath, caption, platforms, scheduledTime, status:'scheduled' });
  return job;
};

const getUpcoming = async (userId) => {
  return await VideoJob.find({ userId, status:'scheduled' }).sort('scheduledTime');
};

export default { schedulePost, getUpcoming };
