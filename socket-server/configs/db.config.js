require('dotenv').config();
const { Sequelize } = require('sequelize');
const moment = require('moment-timezone');
const { DATABASE, TIMEZONES, DATE_FORMATS } = require('../constants');

const appTimezone = process.env.TIMEZONE || TIMEZONES.DEFAULT;
const dbTimezone = moment().tz(appTimezone).format(DATE_FORMATS.TIMEZONE_OFFSET);

const host = process.env.MYSQL_HOST || DATABASE.DEFAULT_HOST;
const port = Number(process.env.MYSQL_PORT) || DATABASE.DEFAULT_PORT;
const dbName = process.env.DB_NAME || DATABASE.DEFAULT_NAME;
const user = process.env.MYSQL_USER || DATABASE.DEFAULT_USER;

const sequelize = new Sequelize(
    dbName,
    user,
    process.env.MYSQL_PASSWORD || DATABASE.DEFAULT_PASSWORD,
    {
        host,
        port,
        dialect: DATABASE.DIALECT,
        timezone: dbTimezone,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: dbTimezone,
        },
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        pool: {
            max: DATABASE.POOL.MAX,
            min: DATABASE.POOL.MIN,
            acquire: DATABASE.POOL.ACQUIRE,
            idle: DATABASE.POOL.IDLE,
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
