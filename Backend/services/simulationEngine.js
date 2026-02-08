// services/simulationEngine.js
import { v4 as uuid } from "uuid";

export function runSimulation({
  creatorProfile,
  videoConfig,
  platform,
  historicalData,
  competitorBenchmarks
}) {
  const scenarios = [];
  const SIMULATION_RUNS = 1000;

  for (let i = 0; i < SIMULATION_RUNS; i++) {
    const hookStrength = randomize(videoConfig.hookScore, 0.15);
    const retention = randomize(videoConfig.retentionScore, 0.2);
    const timingBoost = platformTimingBoost(platform, videoConfig.postTime);
    const voiceFit = randomize(videoConfig.voiceFit, 0.1);
    const competitionFactor = competitorPressure(competitorBenchmarks);

    const predictedViews =
      historicalData.avgViews *
      hookStrength *
      retention *
      timingBoost *
      voiceFit *
      competitionFactor;

    scenarios.push(predictedViews);
  }

  scenarios.sort((a, b) => a - b);

  return {
    id: uuid(),
    runs: SIMULATION_RUNS,
    median: percentile(scenarios, 50),
    floor: percentile(scenarios, 10),
    ceiling: percentile(scenarios, 90),
    variance: calculateVariance(scenarios),
    rawScenarios: scenarios
  };
}

function randomize(base, volatility) {
  return base * (1 + (Math.random() * volatility * 2 - volatility));
}

function percentile(arr, p) {
  const idx = Math.floor((p / 100) * arr.length);
  return Math.round(arr[idx]);
}

function calculateVariance(arr) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length
  );
}

function platformTimingBoost(platform, postTime) {
  if (platform === "tiktok") return postTime.hour >= 18 ? 1.2 : 0.95;
  if (platform === "youtube") return postTime.hour >= 12 ? 1.15 : 1;
  return 1;
}

function competitorPressure(benchmarks) {
  return benchmarks.velocity > 1.3 ? 0.9 : 1.05;
}
