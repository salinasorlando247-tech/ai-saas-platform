import express from 'express';
import videoQueue from '../queues/videoQueue.js';
const router = express.Router();

router.get('/:jobId', async (req, res) => {
  const job = await videoQueue.getJob(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  const progress = job.progress();
  res.json({ progress });
});

export default router;
