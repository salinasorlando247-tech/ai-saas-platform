import cron from 'node-cron'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('./usage.json'))

cron.schedule('0 0 1 * *', async ()=>{
  await db.read()
  db.data.usage.forEach(u=>u.monthCost=0)
  await db.write()
  console.log('Monthly usage reset')
})
