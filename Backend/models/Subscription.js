import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: { type: String, enum: ['free','pro','enterprise'], default: 'free' },
  usage: { type: Number, default: 0 }, // e.g., videos/month
  status: { type: String, enum: ['active','paused','cancelled'], default: 'active' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Subscription', subscriptionSchema);
