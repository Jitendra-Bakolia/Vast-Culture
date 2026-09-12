const fs = require('fs');
const moment = require('moment-timezone');
const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');
const { DATE_FORMATS, LOGGER_CONFIG, TIMEZONES } = require('../constants');

const logDir = LOGGER_CONFIG.DIR;
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

    const currentTz = process.env.TIMEZONE || TIMEZONES.DEFAULT;

    return createLogger({
        level: process.env.LOG_LEVEL || LOGGER_CONFIG.DEFAULT_LEVEL,
        format: combine(
            timestamp({ format: () => moment().tz(currentTz).format(DATE_FORMATS.DEFAULT) }),
            errors({ stack: true })
        ),
        transports: [
            new winston.transports.Console({
                format: combine(
                    colorize(),
                    timestamp({ format: () => moment().tz(currentTz).format(DATE_FORMATS.DEFAULT) }),
                    consoleFormat
                ),
            }),
            new WinstonDailyRotateFile({
                dirname: logDir,
                filename: 'calling-app-%DATE%.log',
                datePattern: DATE_FORMATS.DATE_ONLY,
                maxFiles: LOGGER_CONFIG.APP_LOG_MAX_FILES,
                level: 'info',
            }),
            new WinstonDailyRotateFile({
                dirname: logDir,
                filename: 'calling-error-%DATE%.log',
                datePattern: DATE_FORMATS.DATE_ONLY,
                maxFiles: LOGGER_CONFIG.ERROR_LOG_MAX_FILES,
                level: 'error',
            }),
        ],
    });
};

const logger = getLogger();

const log = (location, error, info = {}) => {
    const errorMsg = error?.message || error || 'Unknown Error';
    const currentTz = process.env.TIMEZONE || TIMEZONES.DEFAULT;
    logger.error(`[${location}] ${errorMsg}`, {
        info,
        stack: error?.stack,
        time: moment().tz(currentTz).format(DATE_FORMATS.TIMESTAMP_WITH_OFFSET),
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
