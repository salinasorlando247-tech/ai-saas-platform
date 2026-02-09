import { redis } from '../config/redis.js';

export const processAnalyticsQueue = async () => {
    while(true) {
        const event = await redis.rpop('analyticsQueue');
        if(event) console.log('Processing analytics:', JSON.parse(event));
        else await new Promise(r => setTimeout(r, 2000));
    }
};
