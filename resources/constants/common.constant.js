const DEFAULT_PORTS = {
    CLIENT: 3000,
    SERVER: 5000,
    SOCKET_SERVER: 7000,
    CALLING_SERVER: 8000,
    JOB_SERVER: 9000,
    MYSQL: 3306,
    REDIS: 6379,
    MYSQL_EXTERNAL: 3307,
    REDIS_EXTERNAL: 6380,
};

const DATABASE = {
    DIALECT: 'mysql',
    DEFAULT_NAME: 'vastculture',
    DEFAULT_USER: 'vastadmin',
    DEFAULT_HOST: 'localhost',
    DEFAULT_PORT: 3306,
    DEFAULT_PASSWORD: 'secret',
    DEFAULT_CHARSET: 'utf8mb4',
    DEFAULT_COLLATE: 'utf8mb4_general_ci',
    POOL: {
        MAX: 10,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000,
    },
};

const REDIS_CONFIG = {
    DEFAULT_HOST: 'localhost',
    DEFAULT_PORT: 6379,
    RETRY_STRATEGY: {
        MULTIPLIER: 200,
        MAX_DELAY: 3000,
    },
};

const QUEUES = {
    DEFAULT_TASKS: 'vast-culture-tasks',
    DEFAULT_JOB_NAME: 'general-task',
    CONCURRENCY: 5,
    ATTEMPTS: 3,
    REMOVE_ON_COMPLETE: true,
};

const DEFAULT_ADMIN_USER = {
    ID: 1,
    EMAIL: 'superadmin@vastculture.com',
    FIRST_NAME: 'priyanka',
    MOBILE_NUMBER: '0000000000',
    ROLE: 'ADMIN',
    TIMEZONE: 'Asia/Kolkata',
    TIME_ZONE: 'Asia/Kolkata',
    STATUS: 'ACTIVE',
    IS_AUTHENTICATED: true,
};

const DATE_FORMATS = {
    DEFAULT: 'YYYY-MM-DD HH:mm:ss',
    DATE_ONLY: 'YYYY-MM-DD',
    TIMEZONE_OFFSET: 'Z',
    TIMESTAMP_WITH_OFFSET: 'YYYY-MM-DD HH:mm:ss ZZ',
};

const SERVER_CONFIG = {
    HOST: '0.0.0.0',
    BODY_LIMIT: '50mb',
    ENVIRONMENTS: {
        DEVELOPMENT: 'development',
        PRODUCTION: 'production',
        TEST: 'test',
    },
    DEV_ENVIRONMENTS: ['development', 'test'],
    DEFAULT_ENV: 'development',
};

const LOGGER_CONFIG = {
    DIR: 'logs',
    DEFAULT_LEVEL: 'info',
    APP_LOG_MAX_FILES: '14d',
    ERROR_LOG_MAX_FILES: '30d',
};

const SERVICE_NAMES = {
    SERVER: 'Core API Server',
    SOCKET_SERVER: 'Socket Server',
    JOB_SERVER: 'BullMQ Job & Worker Server',
    CALLING_SERVER: 'Calling & WebSocket Server',
};

const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 50,
    DEFAULT_ORDER: [['createdAt', 'DESC']],
    EXCLUDE_FIELDS: ['password'],
};

const HEALTH_STATUS = {
    OK: 'OK',
    ERROR: 'ERROR',
};

module.exports = {
    DEFAULT_PORTS,
    DATABASE,
    REDIS_CONFIG,
    QUEUES,
    DEFAULT_ADMIN_USER,
    DATE_FORMATS,
    SERVER_CONFIG,
    LOGGER_CONFIG,
    SERVICE_NAMES,
    PAGINATION,
    HEALTH_STATUS,
};
