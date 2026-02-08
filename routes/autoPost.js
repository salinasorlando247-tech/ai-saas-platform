import express from "express"
import { requireCredits } from "../middleware/credits.js"
import { postToInstagram, postToTikTok, postToYouTube, postToLinkedIn, postToSnapchat } from "../services/socialAPIs.js"

const router = express.Router()

router.post("/publish", requireCredits(3), async (req,res)=>{
  const { content, media, platforms } = req.body
  try{
    const results = {}
    if(platforms.includes("instagram")) results.instagram = await postToInstagram(req.user.tokens.instagram, content, media)
    if(platforms.includes("tiktok")) results.tiktok = await postToTikTok(req.user.tokens.tiktok, content, media)
    if(platforms.includes("youtube")) results.youtube = await postToYouTube(req.user.tokens.youtube, content, media)
    if(platforms.includes("linkedin")) results.linkedin = await postToLinkedIn(req.user.tokens.linkedin, content, media)
    if(platforms.includes("snapchat")) results.snapchat = await postToSnapchat(req.user.tokens.snapchat, content, media)
    res.json({ success:true, results })
  } catch(e){
    console.error(e)
    res.status(500).json({ error:"Failed to post to some platforms" })
  }
})

export default router
