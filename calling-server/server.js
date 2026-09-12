process.env.TZ = process.env.TZ || 'UTC';
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

const PORT = process.env.PORT || process.env.CALLING_PORT || 8000;
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server on same HTTP port
const wss = new WebSocketServer({ server });
WebSocketController(wss);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(userAgent.express());
app.use(requestIp.mw());

if (['development', 'test'].includes(process.env.NODE_ENV || 'development')) {
    app.use(morgan('dev'));
}

app.use('/api/calling', require('./routes'));

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, this route was not found on Calling Server' });
});

app.use(async function (error, req, res, next) {
    log(`${filePath} -> express handler`, error, {
        route: req?._parsedUrl?.pathname,
        method: req?.method,
    });
    res.status(500).json({ success: false, message: error?.message || 'Calling Server Error' });
});

/* -------- Start server -------- */
server.listen(PORT, '0.0.0.0', () => {
    console.log(`
\x1b[33m======================================================================
  📞 [calling-server] Calling & WebSocket Server running on port ${PORT}
  📡 Environment : ${process.env.NODE_ENV || 'development'}
  🔌 Signaling WS: ws://0.0.0.0:${PORT}
  🗄️  Database    : MySQL running on ${process.env.MYSQL_HOST || 'localhost'}:${process.env.MYSQL_PORT || 3306}
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
