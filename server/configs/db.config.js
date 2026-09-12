const path = require('path');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const moment = require('moment-timezone');
const { DATABASE, TIMEZONES, DATE_FORMATS } = require(path.resolve(__dirname, '..', '..', 'resources', 'constants'));

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
        dialect: 'mysql',
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

const now = (tz = appTimezone) => {
    return moment().tz(tz).toDate();
};

const formatInTimezone = (date, format = DATE_FORMATS.DEFAULT, tz = appTimezone) => {
    return moment(date).tz(tz).format(format);
};

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log(`\x1b[32m✔ [mysql-server] MySQL database "${dbName}" connected and running on host "${host}" on port ${port} (Timezone: ${appTimezone} ${dbTimezone})\x1b[0m`);

        // Automatically ensure all defined models are synced to MySQL
        try {
            require('../dao');
            await sequelize.sync();
            console.log(`\x1b[32m✔ [mysql-server] Database tables verified & auto-synchronized successfully.\x1b[0m`);

            // Seed default user if not present
            const { seedDefaultUser } = require('../seeds');
            await seedDefaultUser();
        } catch (syncErr) {
            console.warn(`\x1b[33m⚠ [mysql-server] Table sync note: ${syncErr.message}\x1b[0m`);
        }
    } catch (error) {
        console.error(`\x1b[31m✖ [mysql-server] Unable to connect to MySQL on host "${host}" on port ${port}: ${error.message}\x1b[0m`);
    }
};

module.exports = {
    sequelize,
    connectMySQL,
    moment,
    now,
    formatInTimezone,
};
