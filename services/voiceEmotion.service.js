export function applyEmotion(baseProfile, sliders) {
  return {
    ...baseProfile,
    intensity: sliders.intensity || 50,
    warmth: sliders.warmth || 50,
    aggression: sliders.aggression || 0,
    calmness: sliders.calmness || 50
  };
}
