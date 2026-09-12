const path = require('path');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');

const schemaPath = path.resolve(__dirname, '..', '..', 'resources', 'schemas', 'user.schema.js');
const [attributes, options] = require(schemaPath)(DataTypes);

const User = sequelize.define('User', attributes, options);

module.exports = User;
