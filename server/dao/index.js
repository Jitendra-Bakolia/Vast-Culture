const { sequelize } = require('../configs/db.config');
const User = require('./user.dao');
const LoginActivity = require('./login-activity.dao');

// Define associations
User.hasMany(LoginActivity, { foreignKey: 'userId', as: 'loginActivities' });
LoginActivity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    sequelize,
    User,
    LoginActivity,
};
