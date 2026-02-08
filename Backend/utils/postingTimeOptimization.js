import Video from '../models/Video.js';

export const calculateBestPostTimes = async (userId) => {
  const videos = await Video.find({ user: userId });
  const times = videos.map(v => ({ date: v.createdAt, score: v.analytics.likes + v.analytics.shares }));
  times.sort((a, b) => b.score - a.score);
  return times.slice(0, 5).map(t => t.date.getHours());
};
