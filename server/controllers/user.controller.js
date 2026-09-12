const { User } = require('../dao');
const { recordLoginActivityHelper } = require('./login-activity.controller');
const {
    HttpStatus,
    Toasty,
    USER_ROLES,
    USER_STATUS,
    TIMEZONES,
    LOGIN_ACTIVITY_TYPES,
    ACTIVITY_STATUS,
    PAGINATION,
} = require('../constants');

const UserController = {
    async createUser(req, res, next) {
        try {
            const { email, firstName, lastName, mobileNumber, mobileNo, role, timeZone, timezone, password, status, isAuthenticated } = req.body;
            if (!email) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: Toasty.USER.EMAIL_REQUIRED,
                });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(HttpStatus.CONFLICT).json({
                    success: false,
                    message: Toasty.USER.EMAIL_EXISTS,
                });
            }

            const newUser = await User.create({
                email,
                firstName,
                lastName,
                mobileNumber: mobileNumber || mobileNo || null,
                role: role || USER_ROLES.USER,
                timeZone: timeZone || timezone || TIMEZONES.DEFAULT,
                password: password || null,
                status: status || USER_STATUS.ACTIVE,
                isAuthenticated: typeof isAuthenticated === 'boolean' ? isAuthenticated : false,
            });

            // Automatically record first registration activity
            await recordLoginActivityHelper({
                userId: newUser.id,
                activityType: LOGIN_ACTIVITY_TYPES.REGISTER,
                status: ACTIVITY_STATUS.SUCCESS,
                req,
                metadata: { email: newUser.email, role: newUser.role },
            });

            return res.status(HttpStatus.CREATED).json({
                success: true,
                message: Toasty.USER.CREATED,
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    },

    async getUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: { exclude: PAGINATION.EXCLUDE_FIELDS },
                order: PAGINATION.DEFAULT_ORDER,
                limit: PAGINATION.DEFAULT_LIMIT,
            });

            return res.status(HttpStatus.OK).json({
                success: true,
                message: Toasty.USER.LIST_FETCHED,
                data: users,
            });
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: { exclude: PAGINATION.EXCLUDE_FIELDS },
            });

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: Toasty.USER.NOT_FOUND,
                });
            }

            return res.status(HttpStatus.OK).json({
                success: true,
                message: Toasty.USER.FOUND,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = UserController;
