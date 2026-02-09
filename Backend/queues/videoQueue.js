import Queue from 'bull';
import { generateVideoFromText } from '../services/aiVideoService.js';

const videoQueue = new Queue('video-generation', process.env.REDIS_URL);

videoQueue.process(async (job) => {
  const { script, assets, clientPrefs } = job.data;
  return await generateVideoFromText(script, assets, clientPrefs);
});

export default videoQueue;
