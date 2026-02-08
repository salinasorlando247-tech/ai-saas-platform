export const shouldAutoApprove = (confidenceScore, tier) => {
  if (tier === 'elite' && confidenceScore > 70) return true
  if (tier === 'growth' && confidenceScore > 85) return true
  return false
}
