// src/services/simulationInsightsService.js

export function buildSimulationInsights(simulation) {
  return {
    confidenceScore: simulation.confidenceScore,
    honestyMeter: Math.min(
      1,
      simulation.dataCompleteness * simulation.signalStrength
    ),
    whyItWorks: [
      simulation.hookStrength > 0.7 && "Strong opening hook",
      simulation.retentionCurve > 0.65 && "High predicted watch time",
      simulation.platformFit > 0.7 && "Platform-aligned pacing",
      simulation.audioClarity > 0.75 && "Clear mobile-first audio",
    ].filter(Boolean),
    recommendation:
      simulation.confidenceScore > 0.75
        ? "Post with confidence"
        : "Revise hook or pacing",
  };
}
