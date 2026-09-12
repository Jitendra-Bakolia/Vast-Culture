const RedisUserDAO = require('../redis-dao/user.dao');
const { log } = require('../utils/logger.util');

const saveUserSocket = async (socket, io) => {
    const userId = socket.userId || socket.handshake.query?.userId || `guest_${socket.id.slice(0, 6)}`;
    socket.userId = userId;

    const redisUserDAO = new RedisUserDAO();
    await redisUserDAO.addSocketId(userId, socket.id);

    // Notify others
    socket.broadcast.emit('user:update', { userId, isOnline: true });
    console.log(`[Socket] User ${userId} connected (socket: ${socket.id})`);
};

const removeUserSocket = async (socket, io) => {
    if (!socket.userId) return;
    const redisUserDAO = new RedisUserDAO();
    await redisUserDAO.removeSocketId(socket.userId, socket.id);

    const user = await redisUserDAO.get(socket.userId);
    if (user?.isOnline === 'false') {
        socket.broadcast.emit('user:update', {
            userId: socket.userId,
            isOnline: false,
            lastSeen: new Date(),
        });
    }
    console.log(`[Socket] User ${socket.userId} disconnected (socket: ${socket.id})`);
};

module.exports = (io) => {
    io.on('connection', async (socket) => {
        try {
            await saveUserSocket(socket, io);
        } catch (err) {
            log('socket.handler -> connection', err, { socketId: socket.id });
        }

        socket.on('message', (payload) => {
            console.log(`[Socket] Message from ${socket.userId}:`, payload);
            // Broadcast message or reply
            socket.broadcast.emit('message:broadcast', {
                from: socket.userId,
                data: payload,
                timestamp: new Date().toISOString(),
            });
        });

        socket.on('disconnect', async () => {
            try {
                await removeUserSocket(socket, io);
            } catch (err) {
                log('socket.handler -> disconnect', err, { socketId: socket.id });
            }
        });
    });
};
