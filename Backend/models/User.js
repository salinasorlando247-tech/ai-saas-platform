import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tier: { type: String, default: "free" },
  trialEnds: { type: Date, default: () => new Date(Date.now() + 14*24*60*60*1000) },
});

export default mongoose.model("User", userSchema);
