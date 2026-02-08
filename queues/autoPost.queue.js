import { Queue } from 'bullmq'
import { redis } from '../config/redis.js'

export const autoPostQueue = new Queue('auto-post', {
  connection: redis
})
