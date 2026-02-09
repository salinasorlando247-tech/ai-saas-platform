import { redis } from '../config/redis.js';

export const processJobQueue = async () => {
    while(true) {
        const job = await redis.rpop('postQueue');
        if(job) {
            const task = JSON.parse(job);
            console.log('Processing job for platform:', task.platform);
        } else {
            await new Promise(r => setTimeout(r, 2000));
        }
    }
};
