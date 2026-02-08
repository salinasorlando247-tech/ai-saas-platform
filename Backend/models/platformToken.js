import mongoose from 'mongoose';

const platformTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  platform: { type: String, enum: ['tiktok', 'instagram', 'facebook', 'youtube'] },
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
});

export default mongoose.model('PlatformToken', platformTokenSchema);
