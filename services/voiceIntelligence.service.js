export function adaptVoice(personality, analytics) {
  if (analytics.hookScore < 80) {
    return {
      emphasisBoost: true,
      speedAdjustment: "faster"
    };
  }

  if (analytics.retentionPrediction > 85) {
    return {
      toneAdjustment: "calmer",
      pauseExtension: true
    };
  }

  return {};
}
