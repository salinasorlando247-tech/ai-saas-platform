export const aggregateInsights = (events) => {
  return {
    topIndustries: rank(events, 'industry'),
    topHooks: rank(events, 'hookType'),
    platformVelocity: rank(events, 'platform'),
    winningDurations: histogram(events, 'duration'),
    formatLift: calculateLift(events)
  }
}
