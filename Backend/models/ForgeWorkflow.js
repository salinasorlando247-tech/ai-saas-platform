// forgeWorkflows.js
const Bull = require("bullmq");
const { aiVideoService } = require("./services/aiVideoService");
const { QueueScheduler, Worker } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis(process.env.REDIS_URL);

const videoQueue = new Bull.Queue("videoQueue", { connection });
const scheduler = new QueueScheduler("videoQueue", { connection });

// Worker for AI video processing
const worker = new Worker(
  "videoQueue",
  async (job) => {
    try {
      const { videoData, userId, type } = job.data;

      switch (type) {
        case "auto-create":
          return await aiVideoService.autoCreateVideo(userId, videoData);
        case "auto-edit":
          return await aiVideoService.autoEditVideo(userId, videoData);
        case "scheduled-post":
          return await aiVideoService.schedulePost(userId, videoData);
        default:
          throw new Error("Unknown job type");
      }
    } catch (err) {
      console.error("ForgeWorkflow Worker Error:", err);
      throw err;
    }
  },
  {
    connection,
    concurrency: 5, // GPU/queue hardening
  }
);

// Event listeners for logging
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed for type ${job.data.type}`);
});
worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});

module.exports = { videoQueue, worker, scheduler };
