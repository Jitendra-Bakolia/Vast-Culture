const USER_ROLES = {
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN',
    USER: 'USER',
    AGENT: 'AGENT',
    MANAGER: 'MANAGER',
};

const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    PENDING: 'PENDING',
    SUSPENDED: 'SUSPENDED',
};

const TIMEZONES = {
    DEFAULT: 'Asia/Kolkata',
    ASIA_KOLKATA: 'Asia/Kolkata',
    UTC: 'UTC',
    AMERICA_NEW_YORK: 'America/New_York',
    EUROPE_LONDON: 'Europe/London',
};

const SOCKET_EVENTS = {
    CONNECT: 'connection',
    DISCONNECT: 'disconnect',
    USER_UPDATE: 'user:update',
    ONLINE_STATUS: 'online:status',
    MESSAGE: 'message',
};

const CALL_STATUS = {
    INITIATED: 'INITIATED',
    RINGING: 'RINGING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    BUSY: 'BUSY',
    NO_ANSWER: 'NO_ANSWER',
};

module.exports = {
    USER_ROLES,
    USER_STATUS,
    TIMEZONES,
    SOCKET_EVENTS,
    CALL_STATUS,
};
