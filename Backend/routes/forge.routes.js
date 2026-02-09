import express from 'express'
import auth from '../middleware/auth.js'
import { createForgeVideoObject } from '../services/forgeFormat.js'

const router = express.Router()

router.post('/generate', auth, async (req, res) => {
  const forgeObject = createForgeVideoObject(req.body)
  res.json(forgeObject)
})

router.post('/edit', auth, async (req, res) => {
  res.json({ status: 'edit queued' })
})

router.get('/insights', auth, async (req, res) => {
  res.json({ trends: [] })
})

export default router
