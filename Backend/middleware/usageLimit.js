import Plan from '../models/Plan.js';
import Video from '../models/Video.js';

export const usageLimit = async (req, res, next) => {
  const plan = await Plan.findById(req.user.plan);
  const videoCount = await Video.countDocuments({ owner: req.user._id, createdAt: { $gte: new Date().setMonth(new Date().getMonth() - 1) } });
  if (videoCount >= plan.monthlyLimit) return res.status(403).json({ message: 'Monthly limit reached' });
  next();
};
