const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const { taskQueue } = require('../controllers/worker-events.controller');
const {
    HttpStatus,
    HEALTH_STATUS,
    SERVICE_NAMES,
    QUEUES,
    TIMEZONES,
    Toasty,
} = require('../constants');

router.get('/health', (req, res) => {
    res.status(HttpStatus.OK).json({
        status: HEALTH_STATUS.OK,
        server: SERVICE_NAMES.JOB_SERVER,
        timestamp: moment().tz(TIMEZONES.DEFAULT).toISOString(),
        uptime: process.uptime(),
    });
});

router.post('/dispatch', async (req, res) => {
    try {
        const { jobName, payload } = req.body;
        const job = await taskQueue.add(jobName || QUEUES.DEFAULT_JOB_NAME, payload || {}, {
            removeOnComplete: QUEUES.REMOVE_ON_COMPLETE,
            attempts: QUEUES.ATTEMPTS,
        });
        res.status(HttpStatus.OK).json({
            success: true,
            jobId: job.id,
            message: Toasty.JOB.ENQUEUED,
        });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
    }
});

module.exports = router;
