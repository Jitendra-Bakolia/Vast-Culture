const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const { HttpStatus, HEALTH_STATUS, SERVICE_NAMES, TIMEZONES } = require('../constants');

router.get('/health', (req, res) => {
    res.status(HttpStatus.OK).json({
        status: HEALTH_STATUS.OK,
        server: SERVICE_NAMES.CALLING_SERVER,
        timestamp: moment().tz(TIMEZONES.DEFAULT).toISOString(),
        uptime: process.uptime(),
    });
});

router.get('/status', (req, res) => {
    res.status(HttpStatus.OK).json({
        success: true,
        service: SERVICE_NAMES.CALLING_SERVER,
        activePeersCount: 0,
    });
});

module.exports = router;
