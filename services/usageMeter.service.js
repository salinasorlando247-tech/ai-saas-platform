export function getFacelessUsage(user) {
  const MAX_MINUTES = 120;

  return {
    usedMinutes: user.facelessUsageMinutes || 0,
    maxMinutes: MAX_MINUTES,
    remainingMinutes: Math.max(
      0,
      MAX_MINUTES - (user.facelessUsageMinutes || 0)
    ),
    resetsAt: user.facelessResetAt
  };
}

export function enforceFacelessUsage(user, durationMinutes) {
  const MAX_MINUTES = 120;

  if ((user.facelessUsageMinutes || 0) + durationMinutes > MAX_MINUTES) {
    throw new Error("Monthly faceless export limit reached");
  }

  user.facelessUsageMinutes = (user.facelessUsageMinutes || 0) + durationMinutes;
}
