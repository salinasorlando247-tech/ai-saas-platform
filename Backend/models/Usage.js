import mongoose from 'mongoose'

const UsageSchema = new mongoose.Schema({
  userId: String,
  aiSeconds: { type: Number, default: 0 },
  gpuSeconds: { type: Number, default: 0 },
  videosCreated: { type: Number, default: 0 },
  platformsPosted: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Usage', UsageSchema)
