import { predictPerformance } from './predictiveService.js';

export const evaluateAction = async (videoId, plannedPost) => {
  const prediction = await predictPerformance(videoId);

  // Self-critique: check for risk vs reward
  const risk = prediction.score < 50 ? 'high' : 'low';
  const recommendation = risk === 'high' ? 'Do not post' : 'Post now';

  return { prediction, risk, recommendation };
};
