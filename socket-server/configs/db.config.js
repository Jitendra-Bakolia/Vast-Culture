require('dotenv').config();
const { Sequelize } = require('sequelize');
const moment = require('moment-timezone');

const appTimezone = process.env.TIMEZONE || 'UTC';
const dbTimezone = moment().tz(appTimezone).format('Z');

const host = process.env.MYSQL_HOST || 'localhost';
const port = Number(process.env.MYSQL_PORT) || 3306;
const dbName = process.env.DB_NAME || 'vastculture';
const user = process.env.MYSQL_USER || 'vastadmin';

const sequelize = new Sequelize(
    dbName,
    user,
    process.env.MYSQL_PASSWORD || 'secret',
    {
        host,
        port,
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
        console.log(`\x1b[32m✔ [socket-server -> mysql] MySQL database "${dbName}" connected on host "${host}" on port ${port}\x1b[0m`);
    } catch (error) {
        console.error(`\x1b[31m✖ [socket-server -> mysql] Unable to connect to MySQL on host "${host}" on port ${port}: ${error.message}\x1b[0m`);
    }
};

module.exports = {
    sequelize,
    connectMySQL,
    moment,
};
