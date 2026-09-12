/* eslint-disable no-console */
const path = require('path');
const mysql = require('mysql2/promise');

// Ensure we run from server root for dotenv in db.config.js
process.chdir(path.resolve(__dirname, '..'));
require('dotenv').config();

const { sequelize } = require('../configs/db.config');
const { DATABASE } = require('../constants');

// Load all models and associations
require('../dao');

const args = new Set(process.argv.slice(2));
const shouldAlter = args.has('--alter');
const shouldForce = args.has('--force');
const confirmForce = args.has('--yes');
const enableLogging = args.has('--log');

if (shouldForce && !confirmForce) {
    console.error('Refusing to run with --force without --yes confirmation.');
    console.error('Usage: node script/sync-models.js --force --yes');
    process.exit(1);
}

const syncOptions = {
    alter: shouldAlter,
    force: shouldForce,
    logging: enableLogging ? console.log : false,
};

const ensureDatabaseExists = async () => {
    const dbName = process.env.DB_NAME || DATABASE.DEFAULT_NAME;
    const host = process.env.MYSQL_HOST || DATABASE.DEFAULT_HOST;
    const port = Number(process.env.MYSQL_PORT) || DATABASE.DEFAULT_PORT;
    const user = process.env.MYSQL_USER || DATABASE.DEFAULT_USER;
    const password = process.env.MYSQL_PASSWORD || DATABASE.DEFAULT_PASSWORD;

    try {
        const connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
        });
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET ${DATABASE.DEFAULT_CHARSET} COLLATE ${DATABASE.DEFAULT_COLLATE};`
        );
        await connection.end();
        console.log(`[MySQL] Database "${dbName}" checked/created successfully.`);
    } catch (err) {
        console.warn(`[MySQL] Note on database check: ${err.message}`);
    }
};

const run = async () => {
    try {
        await ensureDatabaseExists();
        await sequelize.authenticate();
        console.log('[MySQL] DB connection OK.');

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync(syncOptions);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log(
            `[Sequelize] Models synced successfully. Options: alter=${Boolean(shouldAlter)}, force=${Boolean(shouldForce)}`
        );

        // Seed default superadmin user
        const { seedDefaultUser } = require('../seeds');
        await seedDefaultUser();
    } catch (err) {
        console.error('[Sequelize] Model sync failed:', err);
        process.exitCode = 1;
    } finally {
        try {
            await sequelize.close();
        } catch (closeErr) {
            console.error('Error closing DB connection:', closeErr);
        }
    }
};

run();
