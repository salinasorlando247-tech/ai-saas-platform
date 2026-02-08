import mongoose from 'mongoose';
const CompetitorSchema = new mongoose.Schema({
  name: String,
  platform: String,
  videoData: Array
}, { timestamps: true });
export default mongoose.model('Competitor', CompetitorSchema);
