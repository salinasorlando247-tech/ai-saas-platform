import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/users', async (req, res) => {
  const { userName, active } = req.body

  if (!active) {
    await User.deleteOne({ email: userName })
    return res.sendStatus(204)
  }

  await User.updateOne(
    { email: userName },
    { email: userName },
    { upsert: true }
  )

  res.sendStatus(201)
})

export default router
