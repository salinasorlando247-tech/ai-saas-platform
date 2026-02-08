import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

export const aiQueue = new Queue("ai-video-queue", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
  },
});
