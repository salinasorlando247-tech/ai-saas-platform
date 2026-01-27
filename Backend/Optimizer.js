import fs from "fs";
import path from "path";

const strategyPath = path.resolve("Backend/data/strategies.json");

if (!fs.existsSync(strategyPath)) {
  fs.writeFileSync(strategyPath, JSON.stringify({}));
}

export function evaluatePerformance(metrics) {
  const engagementScore =
    metrics.likes +
    metrics.comments * 2 +
    metrics.shares * 3 +
    metrics.follows * 4;

  return engagementScore;
}

export function optimizeStrategy(client, postType, metrics) {
  const strategies = JSON.parse(fs.readFileSync(strategyPath));
  const score = evaluatePerformance(metrics);

  if (!strategies[client]) strategies[client] = {};

  if (score < 50) {
    strategies[client][postType] = {
      hook: "More aggressive",
      caption: "Shorter + curiosity driven",
      pacing: "Faster",
      CTA: "Stronger call-to-action"
    };
  } else {
    strategies[client][postType] = {
      hook: "Keep current style",
      caption: "Working well",
      pacing: "Maintain",
      CTA: "Optional"
    };
  }

  fs.writeFileSync(strategyPath, JSON.stringify(strategies, null, 2));
  return strategies[client][postType];
}

export function getClientStrategy(client) {
  const strategies = JSON.parse(fs.readFileSync(strategyPath));
  return strategies[client] || {};
}
