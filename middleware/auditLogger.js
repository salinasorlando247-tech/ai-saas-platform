import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('./audit.json'))

export async function audit(action, userId) {

  await db.read()
  db.data ||= { logs: [] }

  db.data.logs.push({
    action,
    userId,
    time: Date.now()
  })

  await db.write()
}
