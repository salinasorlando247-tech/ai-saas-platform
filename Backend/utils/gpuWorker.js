import { videoQueue } from './redisQueue.js';
import { generateVideo } from './generateVideo.js';

videoQueue.process(async job => {
  const output = await generateVideo(job.data);
  return output;
});
