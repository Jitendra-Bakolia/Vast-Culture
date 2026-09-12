const { User } = require('../dao');
const HttpStatus = require('../constants/http-status.constant');
const Toasty = require('../constants/toasty.constant');
const { USER_ROLES, USER_STATUS, TIMEZONES } = require('../constants/types.constant');

const UserController = {
    async createUser(req, res, next) {
        try {
            const { email, firstName, lastName, mobileNumber, mobileNo, role, timezone, password, status, isAuthenticated } = req.body;
            if (!email) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Email is required',
                });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(HttpStatus.CONFLICT).json({
                    success: false,
                    message: 'User with this email already exists',
                });
            }

            const newUser = await User.create({
                email,
                firstName,
                lastName,
                mobileNumber: mobileNumber || mobileNo || null,
                role: role || USER_ROLES.USER,
                timezone: timezone || TIMEZONES.DEFAULT,
                password: password || null,
                status: status || USER_STATUS.ACTIVE,
                isAuthenticated: typeof isAuthenticated === 'boolean' ? isAuthenticated : false,
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
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC']],
                limit: 50,
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
                attributes: { exclude: ['password'] },
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
