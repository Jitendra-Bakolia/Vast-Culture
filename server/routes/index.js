const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        server: 'Core API Server',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.use('/users', userRoute);

module.exports = router;
