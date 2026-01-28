import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { tiers } from '../core/engine.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()

const adapter = new JSONFile('./jobs/queue.json')
const db = new Low(adapter)

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

// CREATE JOB
router.post('/create', authMiddleware, async (req, res) => {
  const { type } = req.body
  const tier = req.user.tier || 'starter'

  if (!type) return res.status(400).json({ success: false, message: 'Job type required' })

  await db.read()
  db.data ||= { jobs: [] }

  const job = {
    id: Date.now(),
    type,
    tier,
    status: 'pending'
  }

  db.data.jobs.push(job)
  await db.write()

  res.json({ success: true, job })
})

// GET JOBS
router.get('/', authMiddleware, async (req, res) => {
  await db.read()
  db.data ||= { jobs: [] }
  res.json(db.data.jobs)
})

export default router
