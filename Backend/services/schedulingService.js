import Schedule from '../models/Schedule.js';

export const scheduleVideoService = async (userId, { videoId, postDate, platforms }) => {
  const schedule = await Schedule.create({ user: userId, video: videoId, postDate, platforms });
  // Integrate AI logic to adjust best posting times
  return schedule;
};
