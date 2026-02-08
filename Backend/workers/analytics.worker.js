// /backend/workers/analytics.worker.js
import Queue from 'bullmq';
import { fetchAnalyticsForClient } from '../services/analytics.service.js';

const analyticsQueue = new Queue('analyticsQueue');

analyticsQueue.process(async (job) => {
  const { clientId } = job.data;
  return await fetchAnalyticsForClient(clientId);
});

export async function scheduleAnalytics(clientId) {
  await analyticsQueue.add('fetchAnalytics', { clientId });
}
