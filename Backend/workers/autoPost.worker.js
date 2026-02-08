import { Worker } from 'bullmq'
import { redis } from '../config/redis.js'
import { postToPlatform } from '../services/platformRouter.js'

new Worker(
  'auto-post',
  async job => {
    if (job.name === 'AUTO_POST_MASTER') {
      const { platforms, ...payload } = job.data

      for (const platform of platforms) {
        await postToPlatform(platform, payload)
      }
    }
  },
  { connection: redis }
)
