import fs from "fs"

const STRATEGY_FILE = "./strategyMemory.json"

if (!fs.existsSync(STRATEGY_FILE)) {
  fs.writeFileSync(STRATEGY_FILE, JSON.stringify({
    platforms: {
      instagram: { score: 1 },
      tiktok: { score: 1 },
      youtube: { score: 1 }
    },
    budget: {
      total: 1000,
      allocations: {
        instagram: 333,
        tiktok: 333,
        youtube: 334
      }
    },
    campaigns: []
  }, null, 2))
}

export function loadStrategy() {
  return JSON.parse(fs.readFileSync(STRATEGY_FILE))
}

export function saveStrategy(data) {
  fs.writeFileSync(STRATEGY_FILE, JSON.stringify(data, null, 2))
}

// PLATFORM PERFORMANCE UPDATE
export function updatePlatformScores(posts) {
  const strategy = loadStrategy()

  posts.forEach(p => {
    if (!strategy.platforms[p.platform]) return

    const performance =
      p.likes +
      p.shares * 2 +
      p.comments +
      p.clicks * 3

    strategy.platforms[p.platform].score += performance * 0.01
  })

  saveStrategy(strategy)
  return strategy
}

// SMART BUDGET REALLOCATION
export function rebalanceBudget() {
  const strategy = loadStrategy()

  const totalScore = Object.values(strategy.platforms)
    .reduce((sum, p) => sum + p.score, 0)

  Object.keys(strategy.platforms).forEach(platform => {
    const ratio = strategy.platforms[platform].score / totalScore
    strategy.budget.allocations[platform] =
      Math.round(strategy.budget.total * ratio)
  })

  saveStrategy(strategy)
  return strategy.budget
}

// GROWTH FORECAST
export function forecastGrowth() {
  const strategy = loadStrategy()

  const momentum =
    Object.values(strategy.platforms)
      .reduce((sum, p) => sum + p.score, 0)

  return {
    nextWeekGrowth: Math.round(momentum * 2),
    nextMonthGrowth: Math.round(momentum * 10),
    confidence: Math.min(95, momentum)
  }
}

// CAMPAIGN CREATION
export function createCampaign(name, goal) {
  const strategy = loadStrategy()

  const campaign = {
    id: Date.now(),
    name,
    goal,
    createdAt: new Date().toISOString(),
    performance: 0
  }

  strategy.campaigns.push(campaign)
  saveStrategy(strategy)

  return campaign
}
