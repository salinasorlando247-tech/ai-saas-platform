// src/services/dashboardMetricsService.js

export async function getDashboardMetrics(userId) {
  return {
    usage: {
      facelessToday: 2,
      facelessLimit: 3,
      minutesUsed: 6,
      maxMinutes: 10,
    },
    performance: {
      avgConfidence: 0.78,
      successRate: 0.84,
      avgRetention: 0.69,
    },
    referrals: {
      earnings: 12.45,
      activeReferrals: 4,
    },
  };
}
