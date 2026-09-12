require('dotenv').config();
const { Sequelize } = require('sequelize');
const moment = require('moment-timezone');

const appTimezone = process.env.TIMEZONE || 'UTC';
const dbTimezone = moment().tz(appTimezone).format('Z');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'vastculture',
    process.env.MYSQL_USER || 'vastadmin',
    process.env.MYSQL_PASSWORD || 'secret',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT) || 3306,
        dialect: 'mysql',
        timezone: dbTimezone,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: dbTimezone,
        },
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('[Socket-Server MySQL] Connection established successfully.');
    } catch (error) {
        console.error('[Socket-Server MySQL] Unable to connect to database:', error.message);
    }
};

module.exports = {
    sequelize,
    connectMySQL,
    moment,
};
