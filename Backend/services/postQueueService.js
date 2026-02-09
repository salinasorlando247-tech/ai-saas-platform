import { redis } from '../config/redis.js';
import { pool } from '../config/db.js';

// Retry logic for failed posts
export const processPostQueue = async () => {
    let jobStr;
    while((jobStr = await redis.rpop('postQueue'))){
        const job = JSON.parse(jobStr);
        try {
            // Mock posting
            const success = Math.random() > 0.1; // 90% success simulation
            if(!success) throw new Error('Failed to post');

            // Log success metrics
            await pool.query(`INSERT INTO post_metrics(video_id, platform, status, created_at) VALUES($1,$2,'success',NOW())`, 
            [job.videoId, job.platform]);

        } catch (err) {
            // Retry
            job.retries = (job.retries || 0) + 1;
            if(job.retries <= 3){
                await redis.lpush('postQueue', JSON.stringify(job));
            } else {
                await pool.query(`INSERT INTO post_metrics(video_id, platform, status, created_at) VALUES($1,$2,'failed',NOW())`, 
                [job.videoId, job.platform]);
            }
        }
    }
};

// Aggregate post metrics for analytics
export const aggregatePostMetrics = async () => {
    const res = await pool.query(`
        SELECT platform, COUNT(*) as total, 
               SUM(CASE WHEN status='success' THEN 1 ELSE 0 END) as success,
               SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) as failed
        FROM post_metrics GROUP BY platform
    `);
    return res.rows;
};
