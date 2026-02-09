import User from "./user.js";
import { processReferralPayout } from "./facelessService"; // Handles 25% referral

// Simulated payment processing function
async function processPayment(userId, amount) {
  // Replace this with real payment gateway logic (Stripe, PayPal, etc.)
  console.log(`Processing payment of $${amount} for user ${userId}`);
  return { success: true, transactionId: "TXN" + Date.now() };
}

// Upgrade faceless unlock
export async function upgradeFacelessUnlock(userId, amount) {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (user.facelessUnlocked) throw new Error("User already unlocked faceless AI");

  // Charge $5
  const payment = await processPayment(userId, amount);
  if (!payment.success) throw new Error("Payment failed");

  // Unlock faceless AI
  user.facelessUnlocked = true;
  await user.save();

  // Referral payout
  if (user.referredBy) {
    await processReferralPayout(user.referredBy, amount);
  }

  return user; // Return updated user for frontend state
}
