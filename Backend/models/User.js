// user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  tier: { type: String, default: "free" }, // free, starter, pro, elite
  facelessUnlocked: { type: Boolean, default: false }, // $5 unlock
  dailyFacelessUsage: { type: Number, default: 0 },
  lastUsageReset: { type: Date, default: new Date() },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  referralEarnings: { type: Number, default: 0 },
});

// Reset daily faceless usage at midnight
userSchema.methods.resetDailyUsage = function() {
  const now = new Date();
  if (this.lastUsageReset.toDateString() !== now.toDateString()) {
    this.dailyFacelessUsage = 0;
    this.lastUsageReset = now;
  }
};

userSchema.methods.canCreateFaceless = function(videoLengthMinutes) {
  this.resetDailyUsage();

  // Free tier with no unlock = cannot export
  if (this.tier === "free" && !this.facelessUnlocked) return false;

  // Free/$5 unlock = limit: 3x 1-2min or 1x 5min faceless
  if (videoLengthMinutes <= 2 && this.dailyFacelessUsage >= 3) return false;
  if (videoLengthMinutes > 2 && this.dailyFacelessUsage >= 1) return false;

  return true;
};

userSchema.methods.recordFacelessUsage = function(videoLengthMinutes) {
  if (videoLengthMinutes <= 2) this.dailyFacelessUsage += 1;
  else this.dailyFacelessUsage += 1; // counts 1 for 5min too
};

export default mongoose.model("User", userSchema);
