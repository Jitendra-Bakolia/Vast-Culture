const { Toasty } = require('../constants');

let io = null;

module.exports = {
    setIO: (ioInstance) => {
        io = ioInstance;
    },
    getIO: () => {
        if (!io) {
            throw new Error(Toasty.SERVER.SOCKET_NOT_INITIALIZED);
        }
        return io;
    },
};
