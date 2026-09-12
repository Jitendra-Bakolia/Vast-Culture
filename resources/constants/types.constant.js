const USER_ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    AGENT: 'AGENT',
    MANAGER: 'MANAGER',
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
    SOCKET_EVENTS,
    CALL_STATUS,
};
