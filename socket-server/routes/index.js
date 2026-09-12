const express = require('express');
const router = express.Router();
const RedisUserDAO = require('../redis-dao/user.dao');

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        server: 'Socket Server',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.get('/online-users', async (req, res) => {
    try {
        const redisUserDAO = new RedisUserDAO();
        const socketIds = await redisUserDAO.getAllSocketIds();
        res.status(200).json({
            success: true,
            activeSocketsCount: socketIds.length,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
