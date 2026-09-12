const path = require('path');
const { USER_ROLES, USER_STATUS, TIMEZONES } = require(path.resolve(__dirname, '..', 'constants', 'types.constant.js'));

module.exports = ((DataTypes) => {
    return [{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            collate: 'utf8mb4_general_ci',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: USER_ROLES.USER,
        },
        timezone: {
            type: DataTypes.STRING,
            defaultValue: TIMEZONES.DEFAULT,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: USER_STATUS.ACTIVE,
        },
        isAuthenticated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email'],
                name: 'users_email_unique',
            },
        ],
    }];
});
