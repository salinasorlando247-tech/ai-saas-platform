import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import axios from 'axios';

const connection = new IORedis(process.env.REDIS_URL);

new Worker(
  'gpu-processing',
  async job => {
    const { type, payload } = job.data;

    if (type === 'transcription') {
      return await runWhisper(payload);
    }

    if (type === 'video-edit') {
      return await runVideoModel(payload);
    }

    throw new Error('Unknown GPU job');
  },
  { connection }
);
