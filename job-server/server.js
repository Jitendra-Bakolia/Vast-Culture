process.env.TZ = process.env.TZ || 'UTC';
const filePath = 'job-server/server.js';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const { connectMySQL } = require('./configs/db.config');
require('./configs/redis.config');

const { initializeWorkers } = require('./controllers/worker-events.controller');
const { log } = require('./utils/logger.util');

const PORT = process.env.PORT || process.env.JOB_PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (['development', 'test'].includes(process.env.NODE_ENV || 'development')) {
    app.use(morgan('dev'));
}

app.use('/job-api', require('./routes'));

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, this route was not found on the Job Server' });
});

app.use(async function (error, req, res, next) {
    log(`${filePath} -> express handler`, error, {
        route: req?._parsedUrl?.pathname,
        method: req?.method,
    });
    res.status(500).json({ success: false, message: error?.message || 'Job Server Error' });
});

/* -------- Start server & workers -------- */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Job Server] Running on port ${PORT} (PID: ${process.pid})`);
    connectMySQL();
    initializeWorkers();
});

/* -------- Global Error Handling -------- */
process.on('uncaughtException', function (error, name) {
    log(`${filePath} -> uncaughtException`, error, { name });
});

process.on('unhandledRejection', function (reason) {
    log(`${filePath} -> unhandledRejection`, reason);
});

module.exports = app;
