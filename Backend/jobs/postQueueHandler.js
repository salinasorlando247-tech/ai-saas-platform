import { redis } from '../config/redis.js';

export const handlePostQueue = async () => {
    while(true) {
        const job = await redis.rpop('postQueue');
        if(job) console.log('Advanced handler:', JSON.parse(job));
        else await new Promise(r => setTimeout(r, 2000));
    }
};
