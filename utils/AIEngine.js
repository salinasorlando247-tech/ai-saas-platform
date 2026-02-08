import Queue from 'bull';
export const aiRenderQueue = new Queue('ai-render', process.env.REDIS_URL);

// Process queue (placeholder)
aiRenderQueue.process(async (job) => {
  console.log('Generating video for', job.data.userId);
  // placeholder for GPU inference / render pipeline
  return { videoId: 'generated-' + Date.now() };
});
