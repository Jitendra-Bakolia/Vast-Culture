require('dotenv').config();
const { Redis } = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: true,
    retryStrategy(times) {
        return Math.min(times * 200, 3000);
    },
});

redis.on('connect', () => {
    console.log('[Socket-Server Redis] Connection established successfully');
});

redis.on('error', (error) => {
    console.error('[Socket-Server Redis] Connection error:', error.message);
});

module.exports = {
    redis,
};
