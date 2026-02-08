import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  platform: String,
  scheduledAt: Date,
  posted: { type: Boolean, default: false },
  engagementMetrics: Object,
});

export default mongoose.model('Schedule', scheduleSchema);
