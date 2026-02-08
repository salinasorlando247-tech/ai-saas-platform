// src/services/usageMeterService.js

import { recordUsage } from "./usageRepository.js";
import { processReferralReward } from "./referralService.js";

export async function handleSuccessfulFacelessUsage({
  user,
  videoId,
  durationSeconds,
}) {
  // ---- DAILY LIMITS ----------------------------------
  const today = new Date().toISOString().split("T")[0];

  const usageRecord = {
    userId: user.id,
    videoId,
    type: "FACELESS_VIDEO",
    durationSeconds,
    date: today,
    createdAt: new Date(),
  };

  // Save usage (atomic DB operation)
  await recordUsage(usageRecord);

  // ---- REFERRAL HOOK ---------------------------------
  // Only process referral AFTER confirmed usage
  if (user.referredBy) {
    await processReferralReward({
      referrerId: user.referredBy,
      userId: user.id,
      videoId,
      durationSeconds,
    });
  }

  return {
    status: "usage_recorded",
  };
}
