export function calculateGpuCost(startedAt, endedAt, tier) {
  const seconds = (endedAt - startedAt) / 1000;

  const rate =
    tier === 'elite' ? 0.01 :
    tier === 'growth' ? 0.015 :
    0.02;

  return {
    seconds,
    cost: seconds * rate,
  };
}
