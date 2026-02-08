import { Worker } from "bullmq";
import Redis from "ioredis";
import { runAIVideoPipeline } from "../services/aiVideoService.js";
import { emitJobProgress } from "../ws/socket.js";

const connection = new Redis(process.env.REDIS_URL);

export const aiVideoWorker = new Worker(
  "ai-video",
  async (job) => {
    const steps = [
      { label: "Analyzing video", pct: 10 },
      { label: "Scene detection", pct: 25 },
      { label: "AI editing", pct: 45 },
      { label: "Platform optimization", pct: 65 },
      { label: "Rendering", pct: 85 },
      { label: "Finalizing", pct: 100 }
    ];

    for (const step of steps) {
      await runAIVideoPipeline(job.data, step.label);
      await job.updateProgress(step.pct);

      emitJobProgress(job.id, {
        progress: step.pct,
        status: step.label
      });
    }

    return { success: true };
  },
  { connection }
);
