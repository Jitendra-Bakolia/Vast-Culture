const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const userRoute = require('./user.route');
const loginActivityRoute = require('./login-activity.route');
const { HttpStatus, HEALTH_STATUS, SERVICE_NAMES, TIMEZONES } = require('../constants');

router.get('/health', (req, res) => {
    res.status(HttpStatus.OK).json({
        status: HEALTH_STATUS.OK,
        server: SERVICE_NAMES.SERVER,
        timestamp: moment().tz(TIMEZONES.DEFAULT).toISOString(),
        uptime: process.uptime(),
    });
});

router.use('/users', userRoute);
router.use('/login-activities', loginActivityRoute);

module.exports = router;
