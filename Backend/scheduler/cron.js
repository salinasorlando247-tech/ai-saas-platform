import cron from 'node-cron'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Job Queue DB
const adapter = new JSONFile('./jobs/queue.json')
const db = new Low(adapter)


// DAILY AI VIDEO GENERATION (6PM)

cron.schedule('0 18 * * *', async () => {

  console.log('Running daily AI automation')

  await db.read()
  db.data ||= { jobs: [] }

  const job = {
    id: Date.now(),
    type: 'scheduled-ai-video',
    status: 'pending'
  }

  db.data.jobs.push(job)

  await db.write()

  console.log('Scheduled AI job created')
})


// WEEKLY CONTENT BATCH (MONDAY 10AM)

cron.schedule('0 10 * * 1', async () => {

  console.log('Running weekly batch automation')

  await db.read()
  db.data ||= { jobs: [] }

  const job = {
    id: Date.now(),
    type: 'weekly-content-batch',
    status: 'pending'
  }

  db.data.jobs.push(job)

  await db.write()

  console.log('Weekly batch job created')
})
