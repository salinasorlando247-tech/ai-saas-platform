// backend/models/ScheduledPost.js
import mongoose from "mongoose";

const ScheduledPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  date: Date,
});

export default mongoose.model("ScheduledPost", ScheduledPostSchema);
