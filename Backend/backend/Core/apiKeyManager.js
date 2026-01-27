import crypto from 'crypto'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('./apiKeys.json'))

export async function generateApiKey(userId) {

  await db.read()
  db.data ||= { keys: [] }

  const key = crypto.randomBytes(32).toString('hex')

  db.data.keys.push({
    key,
    userId,
    created: Date.now(),
    active: true
  })

  await db.write()

  return key
}

export async function verifyApiKey(key) {

  await db.read()

  return db.data.keys.find(k => k.key === key && k.active)
}
