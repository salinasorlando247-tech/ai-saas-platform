// backend/services/aiRenderQueue.js
import Queue from 'bull';
import { renderVideo } from './aiRenderEngine.js';

const renderQueue = new Queue('videoRender', {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});

renderQueue.process(async job => {
  try {
    const { videoId, prompts } = job.data;
    const output = await renderVideo(prompts); // calls GPU pipeline
    return output;
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export default renderQueue;
