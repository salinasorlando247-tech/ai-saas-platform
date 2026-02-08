import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
    platform: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    status: { type: String, default: 'scheduled' }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
