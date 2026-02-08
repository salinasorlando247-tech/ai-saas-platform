export function validateReferral(referrerId, userId) {
  if (referrerId === userId) {
    throw new Error("Self-referral blocked");
  }
}
