import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    console.warn(`Redis reconnect attempt #${times}, retrying in ${delay}ms`);
    return delay;
  },
  maxRetriesPerRequest: null
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('ready', () => console.log('✅ Redis ready'));
redis.on('error', (err) => console.error('❌ Redis error:', err));
redis.on('close', () => console.warn('⚠️ Redis closed'));
redis.on('reconnecting', (time) => console.log(`🔄 Redis reconnecting in ${time}ms`));

export default redis;
