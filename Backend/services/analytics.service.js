// /backend/services/analytics.service.js
import { getPostPerformance, getCompetitorData } from './platformApis.js';
import { runPredictionModel } from './mlModels.js';
import redis from '../config/redis.js';

export async function fetchAnalyticsForClient(clientId) {
  const platforms = [
    'TikTok','YouTube','Instagram','Facebook','Snapchat','Twitter',
    'LinkedIn','Pinterest','Reddit','Vimeo','Twitch','Discord',
    'Triller','Likee','Quora','Tumblr','Dailymotion','VK','Rumble','Byte'
  ];

  const performanceData = {};
  for (const platform of platforms) {
    performanceData[platform] = await getPostPerformance(clientId, platform);
  }

  const competitors = await getCompetitorData(clientId, platforms);

  const predictions = await runPredictionModel(performanceData, competitors);

  await redis.set(`analytics:${clientId}`, JSON.stringify({ performanceData, competitors, predictions }), 'EX', 300);

  return { performanceData, competitors, predictions };
}

export async function getCachedAnalytics(clientId) {
  const cached = await redis.get(`analytics:${clientId}`);
  return cached ? JSON.parse(cached) : null;
}
