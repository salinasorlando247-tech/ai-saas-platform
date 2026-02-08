import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: String,
  monthlyLimit: Number,
});

export default mongoose.model('Plan', planSchema);
