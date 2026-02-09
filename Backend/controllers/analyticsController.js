import { redis } from '../config/redis.js';

export const getAnalytics = async (req, res) => {
    const analytics = await redis.lrange('analyticsQueue', 0, 149);
    res.json(analytics.map(JSON.parse));
};
