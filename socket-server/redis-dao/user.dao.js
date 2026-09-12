const { redis } = require('../configs/redis.config');
const RedisSocketDAO = require('./socket.dao');

class RedisUserDAO {
    #dbName;

    constructor() {
        this.#dbName = process.env.DB_NAME || 'vastculture';
    }

    static async flushAll() {
        try {
            console.log('[RedisUserDAO] Redis cache initialized.');
        } catch (err) {
            console.error('[RedisUserDAO] Error flushing keys:', err.message);
        }
    }

    async save(userId, data) {
        return redis.hmset(`${this.#dbName}:users:${userId}`, data);
    }

    async get(userId) {
        return redis.hgetall(`${this.#dbName}:users:${userId}`);
    }

    async exists(userId) {
        return redis.exists(`${this.#dbName}:users:${userId}`);
    }

    async addSocketId(userId, socketId) {
        const redisSocketDAO = new RedisSocketDAO();
        await redisSocketDAO.save(socketId, userId);

        await redis.sadd(`${this.#dbName}:users:${userId}:sockets`, socketId);
        await redis.hset(`${this.#dbName}:users:${userId}`, 'isOnline', 'true');
    }

    async removeSocketId(userId, socketId) {
        const redisSocketDAO = new RedisSocketDAO();
        await redisSocketDAO.remove(socketId);

        const key = `${this.#dbName}:users:${userId}:sockets`;
        await redis.srem(key, socketId);

        const remainingSockets = await redis.scard(key);
        if (remainingSockets === 0) {
            await redis.hset(`${this.#dbName}:users:${userId}`, 'isOnline', 'false');
            const unixTime = Math.floor(Date.now() / 1000);
            await redis.hset(`${this.#dbName}:users:${userId}`, 'lastSeen', unixTime);
        }
    }

    async getSocketIds(userId) {
        return redis.smembers(`${this.#dbName}:users:${userId}:sockets`);
    }

    async getAllSocketIds() {
        const pattern = `${this.#dbName}:users:*:sockets`;
        const keys = await redis.keys(pattern);
        if (!keys.length) return [];
        const socketIds = await Promise.all(keys.map(k => redis.smembers(k)));
        return socketIds.flat();
    }
}

module.exports = RedisUserDAO;
