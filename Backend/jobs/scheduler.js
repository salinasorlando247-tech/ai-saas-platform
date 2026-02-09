import redis from '../config/redis.js';
import { postToPlatforms } from '../helpers/platformHelper.js';
import { logEvent } from '../helpers/analyticsHelper.js';

export const startScheduler = () => {
  console.log('🕒 ForgeAI Scheduler started');

  setInterval(async () => {
    const keys = await redis.keys('videoJob:*');

    for (const key of keys) {
      const job = JSON.parse(await redis.get(key));
      if (job.status === 'pending') {
        const platforms = ['YouTube','TikTok','Instagram','Pinterest','Facebook','Twitter'];
        const results = await postToPlatforms(job, platforms);

        job.status = 'posted';
        job.platformResults = results;
        await redis.set(key, JSON.stringify(job));

        await logEvent({ name: 'videoPosted', value: 1 });
      }
    }
  }, 5000);
};
