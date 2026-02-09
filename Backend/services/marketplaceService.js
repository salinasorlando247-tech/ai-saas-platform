import { pool } from '../config/db.js';
import { redis } from '../config/redis.js';

// Aggregate analytics to sell as insights
export const generateBusinessReport = async (filters = {}) => {
    const query = `
        SELECT event, COUNT(*) as count
        FROM analytics
        WHERE created_at > NOW() - INTERVAL '30 days'
        GROUP BY event
    `;
    const result = await pool.query(query);
    return result.rows;
};

// Queue report generation for marketplace
export const queueReport = async (filters) => {
    const job = { type: 'marketplace_report', filters, createdAt: new Date() };
    await redis.lpush('marketplaceQueue', JSON.stringify(job));
    return job;
};
