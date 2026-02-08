export function enforceDailyLimits(user, usage) {
  if (user.tier === "free" && usage.videosToday >= 3) {
    throw new Error("Daily limit reached");
  }

  if (user.tier === "free" && usage.longVideosToday >= 1) {
    throw new Error("Long video limit reached");
  }
}
