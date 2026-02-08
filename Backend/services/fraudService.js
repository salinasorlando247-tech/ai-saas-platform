// src/services/fraudService.js

export function evaluateUserRisk({ user, usage, simulation }) {
  let riskScore = 0;

  if (usage.facelessToday > 3) riskScore += 0.3;
  if (usage.minutesUsedToday > 10) riskScore += 0.3;
  if (simulation.confidenceScore < 0.4) riskScore += 0.2;
  if (user.accountAgeDays < 3) riskScore += 0.2;

  return {
    riskScore,
    flagged: riskScore >= 0.7,
    action:
      riskScore >= 0.9
        ? "BLOCK"
        : riskScore >= 0.7
        ? "REVIEW"
        : "ALLOW",
  };
}
