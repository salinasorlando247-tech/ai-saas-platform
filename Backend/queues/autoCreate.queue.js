import { Queue, Worker } from 'bullmq';
import { autoCreateDailyVideos } from '../services/autoCreateService.js';
import IORedis from 'ioredis';

const connection = new IORedis();

export const autoCreateQueue = new Queue('auto-create', { connection });

export const autoCreateWorker = new Worker('auto-create', async job => {
  const { user } = job.data;
  return await autoCreateDailyVideos(user);
}, { connection });

// Example: Schedule daily for all users
import { getAllUsers } from '../services/userService.js';
import cron from 'node-cron';

cron.schedule('0 6 * * *', async () => { // every day at 6AM server time
  const users = await getAllUsers();
  for (let user of users) {
    if (user.autoCreateEnabled) {
      await autoCreateQueue.add('daily-video', { user });
    }
  }
});
