// src/middleware/apiAccess.js

export function enforceApiLimits(req, res, next) {
  if (!req.user.apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  if (req.user.apiQuotaUsed >= req.user.apiQuotaLimit) {
    return res.status(429).json({ error: "API quota exceeded" });
  }

  next();
}
