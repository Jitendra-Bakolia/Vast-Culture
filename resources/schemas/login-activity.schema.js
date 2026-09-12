const path = require('path');
const { LOGIN_ACTIVITY_TYPES, ACTIVITY_STATUS, DATABASE } = require(path.resolve(__dirname, '..', 'constants'));

module.exports = ((DataTypes) => {
    return [{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        activityType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: LOGIN_ACTIVITY_TYPES.LOGIN,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ACTIVITY_STATUS.SUCCESS,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        clientIp: {
            type: DataTypes.STRING(45),
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        browserVersion: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        os: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        device: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        userAgent: {
            type: DataTypes.TEXT,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            collate: DATABASE.DEFAULT_COLLATE,
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    }, {
        timestamps: true,
        indexes: [
            {
                fields: ['userId'],
                name: 'login_activities_userId_idx',
            },
            {
                fields: ['activityType'],
                name: 'login_activities_activityType_idx',
            },
            {
                fields: ['createdAt'],
                name: 'login_activities_createdAt_idx',
            },
        ],
    }];
});
