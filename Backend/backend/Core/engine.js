export const tiers = {
  starter: {
    aiVideosPerWeek: 1
  },
  pro: {
    aiVideosPerWeek: 4
  },
  enterprise: {
    aiVideosPerWeek: Infinity
  }
}

export function canRunJob(type, tier) {

  const limits = tiers[tier]

  if (type === 'ai-video') {
    return limits.aiVideosPerWeek > 0
  }

  return true
}
