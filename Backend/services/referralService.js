// src/services/referralService.js

import { recordReferralPayout } from "./referralRepository.js";
import { hasReachedReferralCap } from "./referralRules.js";

const PAYOUT_PER_MINUTE = 0.05; // $0.05 per rendered minute
const MAX_PAYOUT_PER_USER = 25; // hard lifetime cap per referral

export async function processReferralReward({
  referrerId,
  userId,
  videoId,
  durationSeconds,
}) {
  // ---- HARD SAFETY CHECKS ----------------------------
  if (referrerId === userId) return; // no self-referrals

  const capped = await hasReachedReferralCap(
    referrerId,
    userId,
    MAX_PAYOUT_PER_USER
  );

  if (capped) return;

  const payoutAmount =
    Math.min(durationSeconds / 60, 5) * PAYOUT_PER_MINUTE;

  if (payoutAmount <= 0) return;

  // ---- RECORD PAYOUT --------------------------------
  await recordReferralPayout({
    referrerId,
    userId,
    videoId,
    amount: payoutAmount,
    type: "FACeless_VIDEO_USAGE",
    createdAt: new Date(),
  });
}
