const { redis } = require('../configs/redis.config');
const { DATABASE } = require('../constants');

class RedisSocketDAO {
    #dbName;

    constructor() {
        this.#dbName = process.env.DB_NAME || DATABASE.DEFAULT_NAME;
    }

    async save(socketId, userId) {
        return redis.set(`${this.#dbName}:sockets:${socketId}`, userId);
    }

    async get(socketId) {
        return redis.get(`${this.#dbName}:sockets:${socketId}`);
    }

    async remove(socketId) {
        return redis.del(`${this.#dbName}:sockets:${socketId}`);
    }
}

module.exports = RedisSocketDAO;
