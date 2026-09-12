const {
    TIMEZONES,
    DEFAULT_PORTS,
    SERVER_CONFIG,
    DATABASE,
    HttpStatus,
    Toasty,
} = require('./constants');

process.env.TZ = process.env.TZ || TIMEZONES.UTC;
const filePath = 'calling-server/server.js';

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const http = require('http');
const requestIp = require('request-ip');
const userAgent = require('express-useragent');
const { WebSocketServer } = require('ws');

const { connectMySQL } = require('./configs/db.config');
const WebSocketController = require('./controllers/websocket.controller');
const { log, info } = require('./utils/logger.util');

const PORT = process.env.PORT || process.env.CALLING_PORT || DEFAULT_PORTS.CALLING_SERVER;
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server on same HTTP port
const wss = new WebSocketServer({ server });
WebSocketController(wss);

app.use(cors());
app.use(express.json({ limit: SERVER_CONFIG.BODY_LIMIT }));
app.use(express.urlencoded({ limit: SERVER_CONFIG.BODY_LIMIT, extended: true }));
app.use(userAgent.express());
app.use(requestIp.mw());

if (SERVER_CONFIG.DEV_ENVIRONMENTS.includes(process.env.NODE_ENV || SERVER_CONFIG.DEFAULT_ENV)) {
    app.use(morgan('dev'));
}

app.use('/api/calling', require('./routes'));

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
        message: error?.message || Toasty.SERVER.CALLING_SERVER_ERROR,
    });
});

/* -------- Start server -------- */
server.listen(PORT, SERVER_CONFIG.HOST, () => {
    console.log(`
\x1b[33m======================================================================
  📞 [calling-server] Calling & WebSocket Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || SERVER_CONFIG.DEFAULT_ENV}
  🔌 Signaling WS: ws://${SERVER_CONFIG.HOST}:${PORT}
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || DATABASE.DEFAULT_HOST}:${process.env.MYSQL_PORT || DATABASE.DEFAULT_PORT}
  🩺 Health Check: http://localhost:${PORT}/api/calling/health
======================================================================\x1b[0m`);
    info(filePath, `Calling Server successfully started on port ${PORT}`);
});

connectMySQL();

/* -------- Global Error Handling -------- */
process.on('uncaughtException', function (error, name) {
    log(`${filePath} -> uncaughtException`, error, { name });
});

process.on('unhandledRejection', function (reason) {
    log(`${filePath} -> unhandledRejection`, reason);
});

module.exports = { app, server, wss };
