export function analyzePreview(frames) {
  return {
    hookScore: Math.floor(Math.random() * 20) + 80,
    pacingScore: Math.floor(Math.random() * 20) + 75,
    retentionPrediction: Math.floor(Math.random() * 15) + 70,
    suggestions: [
      "Cut first 0.4s for stronger hook",
      "Increase contrast on scene 2",
      "Add faster transition at midpoint"
    ]
  };
}
