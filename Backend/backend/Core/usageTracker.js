import fs from "fs"
import { TIERS } from "./roles.js"
import { sendEmail } from "../../emailService.js"

export async function trackUsage(user){

  const usageDB = JSON.parse(fs.readFileSync("./usage.json"))

  if(!usageDB[user.email]){
    usageDB[user.email] = 0
  }

  usageDB[user.email]++

  fs.writeFileSync("./usage.json", JSON.stringify(usageDB,null,2))

  const used = usageDB[user.email]
  const limit = TIERS[user.tier].jobs

  // Unlimited enterprise
  if(limit === Infinity) return true

  // Warning at 80%
  if(used === Math.floor(limit * 0.8)){

    await sendEmail(
      user.email,
      "You're nearing your AI limit",
      `<p>You used ${used}/${limit} AI jobs this month.</p>
       <p>Upgrade to avoid interruption.</p>`
    )
  }

  // Block at limit
  if(used >= limit){
    return false
  }

  return true
}
