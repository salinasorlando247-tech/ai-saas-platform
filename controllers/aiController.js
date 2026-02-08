import { AIEngine } from "../services/AIEngine.js";

export const generateVideo = async (req, res) => {
  const { script, industry, target } = req.body;
  const video = await AIEngine.generate(script, industry, target);
  res.json({ video });
};

export const likeVideo = async (req, res) => {
  const { videoId } = req.params;
  await AIEngine.like(videoId);
  res.json({ message: "Video liked & scheduled" });
};

export const dislikeVideo = async (req, res) => {
  const { videoId } = req.params;
  await AIEngine.dislike(videoId);
  res.json({ message: "Video regenerated" });
};

export const editVideo = async (req, res) => {
  const { videoId, edits } = req.body;
  await AIEngine.edit(videoId, edits);
  res.json({ message: "Video edited" });
};
