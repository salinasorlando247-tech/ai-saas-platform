import Video from '../models/video.js';
import { uploadFile } from '../utils/storage.js';
import { validateUpload } from '../utils/validation.js';
import { aiRenderQueue } from '../utils/queue.js';

export const uploadVideo = async (req, res) => {
  try {
    const file = req.files.video;
    validateUpload(file);
    const s3Result = await uploadFile(file.tempFilePath, process.env.S3_BUCKET, `manual/${file.name}`);
    const video = await Video.create({
      user: req.user._id,
      title: req.body.title || 'Untitled',
      fileUrl: s3Result.Location,
    });
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const editVideo = async (req, res) => {
  try {
    // AI edits logic
    const video = await Video.findById(req.body.videoId);
    if (!video) throw new Error('Video not found');
    aiRenderQueue.add({ videoId: video._id, edits: req.body.edits });
    res.json({ message: 'Video queued for AI editing' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const approveVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.body.videoId);
    if (!video) throw new Error('Video not found');
    video.status = 'ready';
    await video.save();
    res.json({ message: 'Video approved and ready' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const regenerateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.body.videoId);
    if (!video) throw new Error('Video not found');
    aiRenderQueue.add({ videoId: video._id, edits: req.body.edits, regenerate: true });
    res.json({ message: 'Video regeneration queued' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
