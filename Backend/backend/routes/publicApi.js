import express from 'express'
import { routeAI } from '../Core/aiRouter.js'
import { verifyApiKey } from '../Core/apiKeyManager.js'

const router = express.Router()

router.post('/ai', async (req,res)=>{
  const key=req.headers['x-api-key']
  const valid=await verifyApiKey(key)
  if(!valid) return res.status(401).json({ error:'Invalid API Key' })
  const { prompt } = req.body
  const result = await routeAI(prompt)
  res.json(result)
})

export default router
