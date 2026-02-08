import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  hashtags: [String],
  platformMetadata: Object, // stores info for each platform
  fileUrl: String,
  status: { type: String, enum: ['pending', 'processing', 'ready'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Video', videoSchema);
