process.env.TZ = process.env.TZ || 'UTC';
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

const PORT = process.env.PORT || process.env.SOCKET_PORT || 7000;
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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (['development', 'test'].includes(process.env.NODE_ENV || 'development')) {
    app.use(morgan('dev'));
}

app.use('/socket-api', require('./routes'));

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, this route was not found on the Socket Server' });
});

app.use(async function (error, req, res, next) {
    log(`${filePath} -> express handler`, error, {
        route: req?._parsedUrl?.pathname,
        method: req?.method,
    });
    res.status(500).json({ success: false, message: error?.message || 'Socket Server Error' });
});

/* -------- Start the server on the specified port -------- */
server.listen(PORT, '0.0.0.0', () => {
    console.log(`
\x1b[35m======================================================================
  ⚡ [socket-server] Socket.IO & Redis Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || 'development'}
  🔌 Path        : /socket.io
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || 'localhost'}:${process.env.MYSQL_PORT || 3306}
  ⚡ Redis Broker: Redis running on ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}
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
