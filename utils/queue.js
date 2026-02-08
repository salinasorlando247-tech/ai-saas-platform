import Queue from 'bull';
import redis from '../config/redis.js';

export const aiRenderQueue = new Queue('aiRender', { redis });
