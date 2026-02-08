// /backend/services/mlModels.js
import { runGpuInference } from '../workers/ai.worker.js';

export async function runPredictionModel(performanceData, competitors) {
  const predictions = {};

  for (const platform of Object.keys(performanceData)) {
    const data = performanceData[platform];

    const predictedReach = await runGpuInference('predictReach', { platform, data, competitors });
    const optimalPostTime = await runGpuInference('predictOptimalTime', { platform, data, competitors });
    const engagementScore = await runGpuInference('predictEngagement', { platform, data, competitors });
    const revenuePotential = await runGpuInference('predictRevenue', { platform, data, competitors });

    const competitorBenchmark = competitors.find(c => c.platform === platform);
    const outperformScore = competitorBenchmark ? engagementScore / competitorBenchmark.engagementRatio : engagementScore;

    predictions[platform] = {
      predictedReach,
      optimalPostTime,
      engagementScore,
      revenuePotential,
      outperformScore
    };
  }

  return predictions;
}
