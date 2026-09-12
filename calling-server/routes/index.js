const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        server: 'Calling Server',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.get('/status', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'Calling Server & Signaling WebSocket',
        activePeersCount: 0,
    });
});

module.exports = router;
