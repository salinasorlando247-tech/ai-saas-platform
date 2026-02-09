let requestCounts = {};
export const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip;
    requestCounts[ip] = (requestCounts[ip] || 0) + 1;
    if(requestCounts[ip] > 100) return res.status(429).json({ error: 'Too many requests' });
    next();
};
