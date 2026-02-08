import { getVideoMetrics } from './analyticsService.js';

// Predict engagement, virality, best posting times
export const predictPerformance = async (videoId) => {
  const metrics = await getVideoMetrics(videoId);

  // Example algorithm: weighted scoring
  const score = metrics.likes*0.4 + metrics.comments*0.3 + metrics.shares*0.3;

  // Predict optimal post time
  const avgEngagementByHour = metrics.hourlyEngagement; 
  const bestHour = avgEngagementByHour.reduce((a,b)=> a.engagement>b.engagement?a:b).hour;

  return {
    score,
    predictedReach: score*100, // simplified
    bestPostHour: bestHour
  };
};
