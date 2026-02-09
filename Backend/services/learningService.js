// services/learningService.js
export function feedbackAdjust(simulation, realPerformance) {
  const errorRate =
    Math.abs(realPerformance - simulation.median) / simulation.median;

  return {
    adjustConfidence: errorRate > 0.4 ? -10 : +5,
    adjustWeights: errorRate > 0.4 ? "penalize" : "reinforce"
  };
}
