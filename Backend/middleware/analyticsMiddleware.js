import { logAnalytics } from '../analytics/analyticsHelper.js';

export const analyticsMiddleware = async (req, res, next) => {
    await logAnalytics('api_hit', { path: req.path, method: req.method });
    next();
};
