const { User } = require('../dao');
const HttpStatus = require('../constants/http-status.constant');
const Toasty = require('../constants/toasty.constant');

const UserController = {
    async createUser(req, res, next) {
        try {
            const { email, firstName, lastName, mobileNo, role, timezone, password } = req.body;
            if (!email) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Email is required',
                });
            }

            const existingUser = await User.findOne({ where: { email, isDeleted: false } });
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
                mobileNo,
                role: role || 'USER',
                timezone: timezone || 'UTC',
                password,
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
                where: { isDeleted: false },
                attributes: { exclude: ['password', 'otp'] },
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
                attributes: { exclude: ['password', 'otp'] },
            });

            if (!user || user.isDeleted) {
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
