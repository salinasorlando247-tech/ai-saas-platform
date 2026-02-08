export function enforceFacelessLimits(user, durationMinutes) {
  const MAX_MINUTES = 120;

  if (user.facelessUsageMinutes + durationMinutes > MAX_MINUTES) {
    throw new Error("Monthly faceless export limit reached");
  }

  user.facelessUsageMinutes += durationMinutes;
}
