import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", taskSchema);
