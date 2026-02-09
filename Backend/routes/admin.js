import express from 'express'
import { adminOnly } from '../middleware/adminAuth.js'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const router=express.Router()

const userDB = new Low(new JSONFile('./users.json'))
const usageDB = new Low(new JSONFile('./usage.json'))
const jobDB = new Low(new JSONFile('./jobs/queue.json'))
const revenueDB = new Low(new JSONFile('./revenue.json'))

router.get('/users', adminOnly, async(req,res)=>{
  await userDB.read()
  res.json(userDB.data.users)
})
router.get('/usage', adminOnly, async(req,res)=>{
  await usageDB.read()
  res.json(usageDB.data.usage)
})
router.get('/jobs', adminOnly, async(req,res)=>{
  await jobDB.read()
  res.json(jobDB.data.jobs)
})
router.get('/revenue', adminOnly, async(req,res)=>{
  await revenueDB.read()
  res.json(revenueDB.data.revenue)
})
router.get('/profit', adminOnly, async(req,res)=>{
  await revenueDB.read()
  await usageDB.read()
  const revenue=revenueDB.data.revenue.total
  const totalCost = usageDB.data.usage.reduce((sum,u)=>sum+u.monthCost,0)
  res.json({ revenue, aiCost:totalCost, profit:revenue-totalCost })
})

export default router
