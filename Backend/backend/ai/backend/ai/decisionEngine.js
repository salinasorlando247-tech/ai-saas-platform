export function decideAction(score, reach = 0) {
  if (score >= 80 && reach < 1000) return "REPOST"
  if (score >= 120) return "BOOST"
  if (score < 20) return "ABANDON"
  return "HOLD"
}
