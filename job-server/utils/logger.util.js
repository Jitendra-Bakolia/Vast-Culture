const fs = require('fs');
const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const { createLogger, format: { combine, prettyPrint, timestamp } } = winston;

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
                    filename: 'job-error-%DATE%.log',
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
        console.error('Job Logger failed:', e);
    }
};

module.exports = { log };
