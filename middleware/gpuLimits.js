export function enforceGpuLimits(req, res, next) {
  const tier = req.user.tier;

  if (tier === 'free') {
    return res.status(403).json({ error: 'GPU editing requires Pro+' });
  }

  next();
}
