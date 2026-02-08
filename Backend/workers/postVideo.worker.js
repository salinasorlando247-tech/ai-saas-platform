import { Worker } from "bullmq";
import Redis from "ioredis";

import { postToTikTok } from "../services/platforms/tiktok.service.js";
import { postToInstagram } from "../services/platforms/instagram.service.js";
import { postToYouTube } from "../services/platforms/youtube.service.js";
import { postToX } from "../services/platforms/x.service.js";

const connection = new Redis(process.env.REDIS_URL);

export const postVideoWorker = new Worker(
  "post-video",
  async (job) => {
    const { platform, videoUrl, caption, userTokens } = job.data;

    switch (platform) {
      case "tiktok":
        return await postToTikTok(videoUrl, caption, userTokens);
      case "instagram":
        return await postToInstagram(videoUrl, caption, userTokens);
      case "youtube":
        return await postToYouTube(videoUrl, caption, userTokens);
      case "x":
        return await postToX(videoUrl, caption, userTokens);
      default:
        throw new Error("Unsupported platform");
    }
  },
  { connection }
);
