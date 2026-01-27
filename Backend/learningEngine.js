import fs from "fs"

const MEMORY_FILE = "./learningMemory.json"

if (!fs.existsSync(MEMORY_FILE)) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify({
    weights: {
      likes: 2,
      shares: 3,
      comments: 2,
      clicks: 4
    },
    patterns: []
  }, null, 2))
}

export function loadMemory() {
  return JSON.parse(fs.readFileSync(MEMORY_FILE))
}

export function saveMemory(memory) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2))
}

// Update learning weights based on performance
export function updateLearning(posts) {
  const memory = loadMemory()

  let totalScore = 0
  let count = 0

  posts.forEach(p => {
    const score =
      p.likes * memory.weights.likes +
      p.shares * memory.weights.shares +
      p.comments * memory.weights.comments +
      p.clicks * memory.weights.clicks

    if (score > 40) {
      memory.weights.clicks += 0.05
      memory.weights.shares += 0.05
    }

    totalScore += score
    count++
  })

  const avgScore = totalScore / Math.max(count, 1)

  memory.patterns.push({
    timestamp: Date.now(),
    avgScore
  })

  saveMemory(memory)

  return memory
}

// Predict performance of new post
export function predictPerformance() {
  const memory = loadMemory()

  const base =
    memory.weights.likes +
    memory.weights.shares +
    memory.weights.comments +
    memory.weights.clicks

  return {
    predictedScore: Math.round(base * 3),
    confidence: Math.min(95, 50 + memory.patterns.length * 5)
  }
}
