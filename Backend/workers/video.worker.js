import { Worker } from "bullmq";

new Worker("video-render", async job => {

  // THIS is where GPU model runs:
  // Python service
  // FFmpeg pipeline
  // Stable Video Diffusion
  // Runpod / Modal / Local GPU

  console.log("Rendering:",job.data.prompt);

  return {status:"done"};
});
