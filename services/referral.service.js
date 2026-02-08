export function calculateReferralPayout(amountPaid) {
  const COMMISSION_RATE = 0.25;
  const MAX_PAYOUT = 100;
  const payout = amountPaid * COMMISSION_RATE;
  return Math.min(payout, MAX_PAYOUT);
}

export function validateReferral(referrerId, userId) {
  if (!referrerId) return false;
  if (referrerId === userId) throw new Error("Self-referral blocked");
  return true;
}

export function scheduleReferralPayout(referrerId, payout) {
  return {
    referrerId,
    payout,
    availableAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30-day delay
  };
}
