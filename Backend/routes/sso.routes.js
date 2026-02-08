import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
  // token verified by IdP (Okta/Azure/Google)
  res.json({ success: true })
})

export default router
