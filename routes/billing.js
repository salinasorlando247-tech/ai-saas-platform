import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createCheckoutSession } from '../core/stripe.js'

dotenv.config()
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

router.post('/checkout', auth, async (req, res) => {
  const { tier } = req.body

  const url = await createCheckoutSession(req.user.email, tier)

  res.json({ url })
})

export default router
