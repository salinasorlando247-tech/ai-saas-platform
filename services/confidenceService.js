// services/confidenceService.js
export function calculateConfidence(simulation, dataVolume) {
  let score = 100;

  if (simulation.variance > simulation.median * 0.6) score -= 30;
  if (dataVolume < 20) score -= 25;
  if (simulation.floor < simulation.median * 0.4) score -= 20;

  return Math.max(10, Math.min(score, 100));
}

export function honestyLevel(confidence) {
  if (confidence >= 80) return "HIGH";
  if (confidence >= 55) return "MEDIUM";
  return "EXPERIMENTAL";
}
