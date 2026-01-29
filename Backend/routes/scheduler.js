import express from "express"
import { schedulePost, scheduledPosts } from "../services/scheduler.js"

const router = express.Router()

router.post("/add", (req,res)=>{
  const { content, media, platforms, postTime } = req.body
  schedulePost({id:"user1"}, content, media, platforms, postTime)
  res.json({ success:true, message:"Post scheduled successfully" })
})

router.get("/list", (req,res)=>{
  res.json({ posts: scheduledPosts })
})

export default router
