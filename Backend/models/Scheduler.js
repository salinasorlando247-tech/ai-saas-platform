import mongoose from "mongoose";

const schedulerSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platform:   { type: String, required: true },
  contentId:  { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  scheduledFor: { type: Date, required: true },
  status:     { type: String, enum: ["pending","posted","failed"], default: "pending" },
  createdAt:  { type: Date, default: Date.now },
});

export default mongoose.model("Scheduler", schedulerSchema);
