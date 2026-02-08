import { Worker } from "bullmq";
import IORedis from "ioredis";
import aiVideoService from "../services/aiVideoService.js";

const connection = new IORedis(process.env.REDIS_URL);

const worker = new Worker(
  "ai-video-queue",
  async (job) => {
    console.log("🧠 Processing AI job:", job.id);

    const result = await aiVideoService.generateVideo(job.data);

    // TODO:
    // - Save to DB
    // - Trigger auto-post
    // - Send websocket update

    return result;
  },
  {
    connection,
    concurrency: 2, // increase when GPU scales
  }
);

worker.on("completed", (job) => {
  console.log(`✅ AI job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ AI job ${job.id} failed`, err);
});

export default worker;
