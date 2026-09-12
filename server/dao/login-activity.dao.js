const path = require('path');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');

const schemaPath = path.resolve(__dirname, '..', '..', 'resources', 'schemas', 'login-activity.schema.js');
const [attributes, options] = require(schemaPath)(DataTypes);

const LoginActivity = sequelize.define('LoginActivity', attributes, options);

module.exports = LoginActivity;
