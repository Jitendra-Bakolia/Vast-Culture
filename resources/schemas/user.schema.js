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
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'USER',
        },
        timezone: {
            type: DataTypes.STRING,
            defaultValue: 'UTC',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isOtpVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otpExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
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
