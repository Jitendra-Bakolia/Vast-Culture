const {
    TIMEZONES,
    DEFAULT_PORTS,
    SERVER_CONFIG,
    DATABASE,
    REDIS_CONFIG,
    HttpStatus,
    Toasty,
} = require('./constants');

process.env.TZ = process.env.TZ || TIMEZONES.UTC;
const filePath = 'socket-server/server.js';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const { connectMySQL } = require('./configs/db.config');
require('./configs/redis.config');

const SocketHandler = require('./handlers/socket.handler');
const { setIO } = require('./utils/socket');
const { log, info } = require('./utils/logger.util');

const PORT = process.env.PORT || process.env.SOCKET_PORT || DEFAULT_PORTS.SOCKET_SERVER;
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    connectionStateRecovery: { skipMiddlewares: false },
});

setIO(io);
SocketHandler(io);

app.use(cors());
app.use(express.json({ limit: SERVER_CONFIG.BODY_LIMIT }));
app.use(express.urlencoded({ limit: SERVER_CONFIG.BODY_LIMIT, extended: true }));

if (SERVER_CONFIG.DEV_ENVIRONMENTS.includes(process.env.NODE_ENV || SERVER_CONFIG.DEFAULT_ENV)) {
    app.use(morgan('dev'));
}

app.use('/socket-api', require('./routes'));

app.get('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND).json({ message: Toasty.SERVER.ROUTE_NOT_FOUND });
});

app.use(async function (error, req, res, next) {
    log(`${filePath} -> express handler`, error, {
        route: req?._parsedUrl?.pathname,
        method: req?.method,
    });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error?.message || Toasty.SERVER.SOCKET_SERVER_ERROR,
    });
});

/* -------- Start the server on the specified port -------- */
server.listen(PORT, SERVER_CONFIG.HOST, () => {
    console.log(`
\x1b[35m======================================================================
  ⚡ [socket-server] Socket.IO & Redis Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || SERVER_CONFIG.DEFAULT_ENV}
  🔌 Path        : /socket.io
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || DATABASE.DEFAULT_HOST}:${process.env.MYSQL_PORT || DATABASE.DEFAULT_PORT}
  ⚡ Redis Broker: Redis running on ${process.env.REDIS_HOST || REDIS_CONFIG.DEFAULT_HOST}:${process.env.REDIS_PORT || REDIS_CONFIG.DEFAULT_PORT}
  🩺 Health Check: http://localhost:${PORT}/socket-api/health
======================================================================\x1b[0m`);
    info(filePath, `Socket Server successfully started on port ${PORT}`);
});

// Connect to MySQL
connectMySQL();

/* -------- Global Error Handling -------- */
process.on('uncaughtException', function (error, name) {
    log(`${filePath} -> uncaughtException`, error, { name });
});

process.on('unhandledRejection', function (reason) {
    log(`${filePath} -> unhandledRejection`, reason);
});

module.exports = { app, server, io };
