export function detectAbuse(activity) {
  if (
    activity.creationsPerMinute > 3 ||
    activity.samePromptReused > 5
  ) {
    return { flagged: true, reason: "automation suspected" };
  }

  return { flagged: false };
}
