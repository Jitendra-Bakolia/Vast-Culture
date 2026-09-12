const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const RedisUserDAO = require('../redis-dao/user.dao');
const { HttpStatus, HEALTH_STATUS, SERVICE_NAMES, TIMEZONES } = require('../constants');

router.get('/health', (req, res) => {
    res.status(HttpStatus.OK).json({
        status: HEALTH_STATUS.OK,
        server: SERVICE_NAMES.SOCKET_SERVER,
        timestamp: moment().tz(TIMEZONES.DEFAULT).toISOString(),
        uptime: process.uptime(),
    });
});

router.get('/online-users', async (req, res) => {
    try {
        const redisUserDAO = new RedisUserDAO();
        const socketIds = await redisUserDAO.getAllSocketIds();
        res.status(HttpStatus.OK).json({
            success: true,
            activeSocketsCount: socketIds.length,
        });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
    }
});

module.exports = router;
