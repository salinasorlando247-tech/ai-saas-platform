import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL);

export const gpuQueue = new Queue('gpu-processing', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    removeOnComplete: true,
    removeOnFail: false,
  },
});
