import cron from "node-cron"
import { publishPost } from "./socialAPIs.js"

export const scheduledPosts = []

export function schedulePost(user, content, media, platforms, postTime){
  const task = cron.schedule(postTime, async ()=>{
    try{
      await publishPost(user, content, media, platforms)
      console.log(`Post published for ${user.id} at ${new Date()}`)
    } catch(e){
      console.error("Scheduled post failed:", e)
    }
  })
  scheduledPosts.push({ user, content, media, platforms, postTime })
}
