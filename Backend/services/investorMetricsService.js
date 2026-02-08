// src/services/investorMetricsService.js

export function buildInvestorMetrics(systemStats) {
  return {
    modelReliability: systemStats.avgConfidence,
    rejectionSavings: systemStats.preventedBadRenders,
    costEfficiency:
      systemStats.successfulVideos / systemStats.totalComputeCost,
    confidenceStability: systemStats.confidenceVariance,
    moatSignal:
      systemStats.simulationAccuracy * systemStats.usageConsistency,
  };
}
