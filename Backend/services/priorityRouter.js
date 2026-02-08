export const routeJobByTier = tier => {
  if (tier === 'elite') return 'gpu-priority'
  if (tier === 'growth') return 'gpu-standard'
  return 'gpu-basic'
}
