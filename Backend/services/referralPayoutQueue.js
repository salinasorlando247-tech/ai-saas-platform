export function scheduleReferralPayout(referrerId, payout) {
  return {
    referrerId,
    payout,
    availableAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30-day delay
  };
}
