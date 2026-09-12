const Toasty = {
    SERVER: {
        INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
        ROUTE_NOT_FOUND: 'Sorry, this route was not found on this server.',
        SOCKET_SERVER_ERROR: 'Socket Server Error',
        JOB_SERVER_ERROR: 'Job Server Error',
        CALLING_SERVER_ERROR: 'Calling Server Error',
    },
    USER: {
        CREATED: 'User created successfully.',
        FOUND: 'User retrieved successfully.',
        NOT_FOUND: 'User not found.',
        LIST_FETCHED: 'Users fetched successfully.',
        UPDATED: 'User updated successfully.',
        EMAIL_REQUIRED: 'Email is required',
        EMAIL_EXISTS: 'User with this email already exists',
    },
    JOB: {
        ENQUEUED: 'Job enqueued successfully',
    },
};

module.exports = Toasty;
