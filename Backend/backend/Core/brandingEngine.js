import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('./branding.json'))

export async function setBrand(orgId, theme) {

  await db.read()
  db.data ||= { brands: [] }

  const existing = db.data.brands.find(b => b.orgId === orgId)

  if (existing) {
    existing.theme = theme
  } else {
    db.data.brands.push({ orgId, theme })
  }

  await db.write()
}

export async function getBrand(orgId) {

  await db.read()
  return db.data.brands.find(b => b.orgId === orgId)
}
