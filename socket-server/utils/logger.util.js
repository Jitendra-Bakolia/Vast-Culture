const fs = require('fs');
const moment = require('moment-timezone');
const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const { createLogger, format: { combine, timestamp, printf, colorize, errors } } = winston;

const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    let logMsg = `[${timestamp}] [${level}]: ${stack || message}`;
    const keys = Object.keys(meta);
    if (keys.length > 0 && !(keys.length === 1 && keys[0] === 'info' && Object.keys(meta.info || {}).length === 0)) {
        logMsg += ` ${JSON.stringify(meta)}`;
    }
    return logMsg;
});

const getLogger = () => {
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

    return createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true })
        ),
        transports: [
            new winston.transports.Console({
                format: combine(
                    colorize(),
                    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    consoleFormat
                ),
            }),
            new WinstonDailyRotateFile({
                dirname: logDir,
                filename: 'socket-app-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '14d',
                level: 'info',
            }),
            new WinstonDailyRotateFile({
                dirname: logDir,
                filename: 'socket-error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '30d',
                level: 'error',
            }),
        ],
    });
};

const logger = getLogger();

const log = (location, error, info = {}) => {
    const errorMsg = error?.message || error || 'Unknown Error';
    logger.error(`[${location}] ${errorMsg}`, {
        info,
        stack: error?.stack,
        time: moment().format('YYYY-MM-DD HH:mm:ss ZZ'),
    });
};

const info = (location, message, data = {}) => {
    logger.info(`[${location}] ${message}`, data);
};

const warn = (location, message, data = {}) => {
    logger.warn(`[${location}] ${message}`, data);
};

const debug = (location, message, data = {}) => {
    logger.debug(`[${location}] ${message}`, data);
};

module.exports = {
    log,
    info,
    warn,
    debug,
    logger,
};
