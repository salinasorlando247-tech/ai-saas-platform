import mongoose from 'mongoose'

const VideoApprovalSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'overridden'],
    default: 'pending'
  },

  aiConfidenceScore: { type: Number, default: 0 }, // 0–100
  aiReasoning: { type: String },

  approvedBy: { type: String }, // 'ai' | userId | 'system'
  overrideReason: { type: String },

  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('VideoApproval', VideoApprovalSchema)
