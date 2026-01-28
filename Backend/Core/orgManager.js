import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import crypto from 'crypto'

const db = new Low(new JSONFile('./orgs.json'))

export async function createOrg(name, ownerId) {

  await db.read()
  db.data ||= { orgs: [] }

  const org = {
    id: crypto.randomUUID(),
    name,
    ownerId,
    members: [ownerId],
    createdAt: Date.now()
  }

  db.data.orgs.push(org)
  await db.write()

  return org
}

export async function addMember(orgId, userId) {

  await db.read()

  const org = db.data.orgs.find(o => o.id === orgId)

  if (!org.members.includes(userId)) {
    org.members.push(userId)
    await db.write()
  }

}
