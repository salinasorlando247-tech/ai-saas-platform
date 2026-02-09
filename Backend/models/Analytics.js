import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  views: Number,
  likes: Number,
  shares: Number,
  comments: Number,
  subscribersGained: Number,
  ctaClicks: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Analytics', analyticsSchema);
