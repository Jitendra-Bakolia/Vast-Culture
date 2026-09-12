const moment = require('moment-timezone');
const RedisUserDAO = require('../redis-dao/user.dao');
const { log } = require('../utils/logger.util');
const { SOCKET_EVENTS, TIMEZONES } = require('../constants');

const saveUserSocket = async (socket, io) => {
    const userId = socket.userId || socket.handshake.query?.userId || `guest_${socket.id.slice(0, 6)}`;
    socket.userId = userId;

    const redisUserDAO = new RedisUserDAO();
    await redisUserDAO.addSocketId(userId, socket.id);

    // Notify others
    socket.broadcast.emit(SOCKET_EVENTS.USER_UPDATE, { userId, isOnline: true });
    console.log(`[Socket] User ${userId} connected (socket: ${socket.id})`);
};

const removeUserSocket = async (socket, io) => {
    if (!socket.userId) return;
    const redisUserDAO = new RedisUserDAO();
    await redisUserDAO.removeSocketId(socket.userId, socket.id);

    const user = await redisUserDAO.get(socket.userId);
    if (user?.isOnline === 'false') {
        socket.broadcast.emit(SOCKET_EVENTS.USER_UPDATE, {
            userId: socket.userId,
            isOnline: false,
            lastSeen: moment().tz(TIMEZONES.DEFAULT).toDate(),
        });
    }
    console.log(`[Socket] User ${socket.userId} disconnected (socket: ${socket.id})`);
};

module.exports = (io) => {
    io.on(SOCKET_EVENTS.CONNECT, async (socket) => {
        try {
            await saveUserSocket(socket, io);
        } catch (err) {
            log('socket.handler -> connection', err, { socketId: socket.id });
        }

        socket.on(SOCKET_EVENTS.MESSAGE, (payload) => {
            console.log(`[Socket] Message from ${socket.userId}:`, payload);
            // Broadcast message or reply
            socket.broadcast.emit(SOCKET_EVENTS.MESSAGE_BROADCAST, {
                from: socket.userId,
                data: payload,
                timestamp: moment().tz(TIMEZONES.DEFAULT).toISOString(),
            });
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, async () => {
            try {
                await removeUserSocket(socket, io);
            } catch (err) {
                log('socket.handler -> disconnect', err, { socketId: socket.id });
            }
        });
    });
};
