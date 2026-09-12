const { LoginActivity, User } = require('../dao');
const { extractClientInfo } = require('../utils/client-info.util');
const {
    HttpStatus,
    Toasty,
    LOGIN_ACTIVITY_TYPES,
    ACTIVITY_STATUS,
    PAGINATION,
} = require('../constants');

/**
 * Programmatic helper to record login/logout/register activity
 */
const recordLoginActivityHelper = async ({
    userId = null,
    activityType = LOGIN_ACTIVITY_TYPES.LOGIN,
    status = ACTIVITY_STATUS.SUCCESS,
    req = null,
    metadata = null,
} = {}) => {
    try {
        const clientInfo = req ? extractClientInfo(req) : {};
        return await LoginActivity.create({
            userId,
            activityType,
            status,
            clientIp: clientInfo.clientIp || null,
            browser: clientInfo.browser || null,
            browserVersion: clientInfo.browserVersion || null,
            os: clientInfo.os || null,
            platform: clientInfo.platform || null,
            device: clientInfo.device || null,
            userAgent: clientInfo.userAgent || null,
            metadata: metadata || null,
        });
    } catch (err) {
        console.warn(`[LoginActivity] Warning recording activity: ${err.message}`);
        return null;
    }
};

const LoginActivityController = {
    recordLoginActivityHelper,

    async recordActivity(req, res, next) {
        try {
            const { userId, activityType, status, metadata } = req.body;
            const activity = await recordLoginActivityHelper({
                userId: userId || null,
                activityType: activityType || LOGIN_ACTIVITY_TYPES.LOGIN,
                status: status || ACTIVITY_STATUS.SUCCESS,
                req,
                metadata: metadata || null,
            });

            return res.status(HttpStatus.CREATED).json({
                success: true,
                message: Toasty.LOGIN_ACTIVITY.RECORDED,
                data: activity,
            });
        } catch (error) {
            next(error);
        }
    },

    async getActivities(req, res, next) {
        try {
            const { userId, activityType, status, limit, offset } = req.query;
            const where = {};
            if (userId) where.userId = userId;
            if (activityType) where.activityType = activityType;
            if (status) where.status = status;

            const activities = await LoginActivity.findAll({
                where,
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
                }],
                order: PAGINATION.DEFAULT_ORDER,
                limit: Number(limit) || PAGINATION.DEFAULT_LIMIT,
                offset: Number(offset) || 0,
            });

            return res.status(HttpStatus.OK).json({
                success: true,
                message: Toasty.LOGIN_ACTIVITY.LIST_FETCHED,
                data: activities,
            });
        } catch (error) {
            next(error);
        }
    },

    async getUserActivities(req, res, next) {
        try {
            const { userId } = req.params;
            const activities = await LoginActivity.findAll({
                where: { userId },
                order: PAGINATION.DEFAULT_ORDER,
                limit: PAGINATION.DEFAULT_LIMIT,
            });

            return res.status(HttpStatus.OK).json({
                success: true,
                message: Toasty.LOGIN_ACTIVITY.USER_ACTIVITIES_FETCHED,
                data: activities,
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = LoginActivityController;
