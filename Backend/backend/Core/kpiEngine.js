import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const userDB = new Low(new JSONFile('./users.json'))
const revenueDB = new Low(new JSONFile('./revenue.json'))

export async function calculateKPIs() {

  await userDB.read()
  await revenueDB.read()

  const users = userDB.data.users.length
  const revenue = revenueDB.data.revenue.total

  const ltv = users ? (revenue / users).toFixed(2) : 0

  return {
    users,
    revenue,
    ltv
  }
}
