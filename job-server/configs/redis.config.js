require('dotenv').config();
const { Redis } = require('ioredis');

const host = process.env.REDIS_HOST || 'localhost';
const port = Number(process.env.REDIS_PORT) || 6379;

const redis = new Redis({
    host,
    port,
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: true,
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        return Math.min(times * 200, 3000);
    },
});

redis.on('connect', () => {
    console.log(`\x1b[32m✔ [job-server -> redis] Redis job queue broker connected on host "${host}" on port ${port}\x1b[0m`);
});

redis.on('error', (error) => {
    console.error(`\x1b[31m✖ [job-server -> redis] Redis connection error on host "${host}" on port ${port}: ${error.message}\x1b[0m`);
});

module.exports = {
    redis,
};
