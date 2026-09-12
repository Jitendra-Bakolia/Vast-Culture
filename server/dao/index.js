const { sequelize } = require('../configs/db.config');
const User = require('./user.dao');

// Define associations here as new models are added

module.exports = {
    sequelize,
    User,
};
