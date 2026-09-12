const express = require('express');
const router = express.Router();
const { taskQueue } = require('../controllers/worker-events.controller');

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        server: 'Job Server',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.post('/dispatch', async (req, res) => {
    try {
        const { jobName, payload } = req.body;
        const job = await taskQueue.add(jobName || 'general-task', payload || {}, {
            removeOnComplete: true,
            attempts: 3,
        });
        res.status(200).json({
            success: true,
            jobId: job.id,
            message: 'Job enqueued successfully',
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
