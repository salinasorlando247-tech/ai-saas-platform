import express from 'express'
import { routeAI } from '../Core/aiRouter.js'

const router=express.Router()

router.post('/ai', async(req,res)=>{
  const { prompt, jobId } = req.body
  const result = await routeAI(prompt)
  res.json({ jobId, output: result.output })
})

export default router
