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
};

const QUEUES = {
    DEFAULT_TASKS: 'vast-culture-tasks',
    DEFAULT_JOB_NAME: 'general-task',
    CONCURRENCY: 5,
    ATTEMPTS: 3,
};

const DEFAULT_ADMIN_USER = {
    ID: 1,
    EMAIL: 'superadmin@vastculture.com',
    FIRST_NAME: 'priyanka',
    MOBILE_NUMBER: '0000000000',
};

const DATE_FORMATS = {
    DEFAULT: 'YYYY-MM-DD HH:mm:ss',
    DATE_ONLY: 'YYYY-MM-DD',
    TIMEZONE_OFFSET: 'Z',
    TIMESTAMP_WITH_OFFSET: 'YYYY-MM-DD HH:mm:ss ZZ',
};

module.exports = {
    DEFAULT_PORTS,
    DATABASE,
    REDIS_CONFIG,
    QUEUES,
    DEFAULT_ADMIN_USER,
    DATE_FORMATS,
};
