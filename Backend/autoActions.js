import { loadMemory } from "./learningEngine.js"

export function decideAction(post) {
  const memory = loadMemory()

  const score =
    post.likes * memory.weights.likes +
    post.shares * memory.weights.shares +
    post.comments * memory.weights.comments +
    post.clicks * memory.weights.clicks

  let decision = "HOLD"

  if (score >= 70) decision = "BOOST"
  else if (score >= 35) decision = "REPOST"
  else if (score < 15) decision = "ABANDON"

  return {
    ...post,
    aiScore: Math.round(score),
    decision,
    optimizedAt: new Date().toISOString()
  }
}
