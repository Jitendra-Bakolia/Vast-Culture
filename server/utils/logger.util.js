const fs = require('fs');
const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const { createLogger, format: { combine, prettyPrint, timestamp } } = winston;

/**
 * Log error and context
 * @param {String} location file and function location
 * @param {Object} error error object
 * @param {Object} info context info
 */
const log = (location, error, info) => {
    try {
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

        const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

        const errorLogger = createLogger({
            format: combine(timestamp(), prettyPrint()),
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    level: 'debug',
                }),
                new WinstonDailyRotateFile({
                    dirname: logDir,
                    filename: 'error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '14d',
                    level: 'error',
                }),
            ],
        });

        errorLogger.error({
            location,
            message: error?.message || error,
            stack: error?.stack,
            info,
            timestamp: new Date().toISOString(),
        });
    } catch (e) {
        console.error('Logger failed:', e);
    }
};

module.exports = {
    log,
};
