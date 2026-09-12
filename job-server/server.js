process.env.TZ = process.env.TZ || 'UTC';
const filePath = 'job-server/server.js';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const { connectMySQL } = require('./configs/db.config');
require('./configs/redis.config');

const { initializeWorkers } = require('./controllers/worker-events.controller');
const { log, info } = require('./utils/logger.util');

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
    console.log(`
\x1b[34m======================================================================
  💼 [job-server] BullMQ Job & Worker Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || 'development'}
  📦 Task Queue  : vast-culture-tasks
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || 'localhost'}:${process.env.MYSQL_PORT || 3306}
  ⚡ Redis Broker: Redis running on ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}
  🩺 Health Check: http://localhost:${PORT}/job-api/health
======================================================================\x1b[0m`);
    info(filePath, `Job Server successfully started on port ${PORT}`);
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
