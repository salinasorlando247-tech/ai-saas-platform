import cron from 'node-cron'
import { runWorker } from '../workers/aiWorker.js'

cron.schedule('*/1 * * * *', async ()=>{
  await runWorker()
})
