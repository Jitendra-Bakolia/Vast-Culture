require('dotenv').config();
const { Redis } = require('ioredis');
const { REDIS_CONFIG } = require('../constants');

const host = process.env.REDIS_HOST || REDIS_CONFIG.DEFAULT_HOST;
const port = Number(process.env.REDIS_PORT) || REDIS_CONFIG.DEFAULT_PORT;

const redis = new Redis({
    host,
    port,
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: true,
    retryStrategy(times) {
        return Math.min(times * REDIS_CONFIG.RETRY_STRATEGY.MULTIPLIER, REDIS_CONFIG.RETRY_STRATEGY.MAX_DELAY);
    },
});

redis.on('connect', () => {
    console.log(`\x1b[32m✔ [socket-server -> redis] Redis broker connected on host "${host}" on port ${port}\x1b[0m`);
});

redis.on('error', (error) => {
    console.error(`\x1b[31m✖ [socket-server -> redis] Redis connection error on host "${host}" on port ${port}: ${error.message}\x1b[0m`);
});

module.exports = {
    redis,
};
