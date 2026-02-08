import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()
const adapter = new JSONFile('./users.json')
const db = new Low(adapter)
const JWT_SECRET = process.env.JWT_SECRET

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password, tier } = req.body
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email & password required' })

  await db.read()
  db.data ||= { users: [] }

  if (db.data.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email exists' })
  }

  const hash = await bcrypt.hash(password, 10)
  const user = { id: Date.now(), email, password: hash, tier: tier || 'starter' }
  db.data.users.push(user)
  await db.write()

  const token = jwt.sign({ id: user.id, tier: user.tier }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token, user: { email: user.email, tier: user.tier } })
})

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  await db.read()
  db.data ||= { users: [] }
  const user = db.data.users.find(u => u.email === email)
  if (!user) return res.status(400).json({ success: false, message: 'User not found' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ success: false, message: 'Invalid password' })

  const token = jwt.sign({ id: user.id, tier: user.tier }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token, user: { email: user.email, tier: user.tier } })
})

export default router
