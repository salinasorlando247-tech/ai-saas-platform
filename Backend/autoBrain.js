import fs from "fs"
import { learnFromData } from "./learningEngine.js"

const MEMORY_FILE = "./ai_memory.json"

if (!fs.existsSync(MEMORY_FILE)) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify({
    cycles: 0,
    performanceScore: 50,
    lastRun: null
  }, null, 2))
}

function loadMemory() {
  return JSON.parse(fs.readFileSync(MEMORY_FILE))
}

function saveMemory(data) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2))
}

export function runAutoBrain(posts) {
  const memory = loadMemory()

  let engagement = 0

  posts.forEach(p => {
    engagement += p.likes + p.shares + p.comments + p.clicks
  })

  const learning = learnFromData(engagement)

  if (learning.trend === "improving") {
    memory.performanceScore += 4
  }

  if (learning.trend === "declining") {
    memory.performanceScore -= 6
  }

  if (memory.performanceScore > 100) memory.performanceScore = 100
  if (memory.performanceScore < 0) memory.performanceScore = 0

  memory.cycles++
  memory.lastRun = new Date().toISOString()

  saveMemory(memory)

  return {
    engagement,
    cycles: memory.cycles,
    score: memory.performanceScore,
    trend: learning.trend
  }
}
