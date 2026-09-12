process.env.TZ = process.env.TZ || 'UTC';
const filePath = 'server/server.js';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const requestIp = require('request-ip');
const userAgent = require('express-useragent');

const { connectMySQL } = require('./configs/db.config');
require('./configs/redis.config');

const { log, info } = require('./utils/logger.util');
const HttpStatus = require('./constants/http-status.constant');
const Toasty = require('./constants/toasty.constant');

const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
const app = express();

app.disable('etag');
app.use(cors({
    origin: '*',
    exposedHeaders: ['x-token', 'content-disposition'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(userAgent.express());
app.use(requestIp.mw());

if (['development', 'test'].includes(process.env.NODE_ENV || 'development')) {
    app.use(morgan('dev'));
}

// Connect Database
connectMySQL();

// Mount Routes
app.use('/api', require('./routes'));

app.get('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({ message: Toasty.SERVER.ROUTE_NOT_FOUND });
});

// Error handling middleware
app.use(async function (error, req, res, next) {
    log(`${filePath} -> express error handler`, error, {
        request: {
            query: req?.query,
            params: req?.params,
            body: req?.body,
            route: req?._parsedUrl?.pathname,
            method: req?.method,
        },
    });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error?.message || Toasty.SERVER.INTERNAL_SERVER_ERROR,
    });
});

/* -------- Start server -------- */
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
\x1b[36m======================================================================
  🚀 [core-server] Core API Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || 'development'}
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || 'localhost'}:${process.env.MYSQL_PORT || 3306}
  ⚡ Cache       : Redis running on ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}
  🩺 Health Check: http://localhost:${PORT}/api/health
======================================================================\x1b[0m`);
    info(filePath, `Core API Server successfully started on port ${PORT}`);
});

/* -------- Global Error Handling -------- */
process.on('uncaughtException', function (error, name) {
    log(`${filePath} -> uncaughtException`, error, { name });
});

process.on('unhandledRejection', function (reason) {
    log(`${filePath} -> unhandledRejection`, reason);
});

module.exports = { app, server };
