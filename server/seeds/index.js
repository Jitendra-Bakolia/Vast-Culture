const { User } = require('../dao');
const { USER_ROLES, USER_STATUS, TIMEZONES } = require('../constants/types.constant');

const seedDefaultUser = async () => {
    try {
        const defaultPayload = {
            id: 1,
            email: 'superadmin@vastculture.com',
            firstName: 'priyanka',
            mobileNumber: '0000000000',
            role: USER_ROLES.ADMIN,
            timezone: TIMEZONES.DEFAULT,
            status: USER_STATUS.ACTIVE,
            isAuthenticated: true,
        };

        const existingByEmail = await User.findOne({ where: { email: defaultPayload.email } });
        const existingById = await User.findByPk(1);

        if (existingByEmail) {
            await User.update(defaultPayload, { where: { id: existingByEmail.id } });
            console.log(`\x1b[32m✔ [mysql-server] Default user confirmed: ID ${existingByEmail.id} | ${defaultPayload.email} (${defaultPayload.firstName}) | Role: ${defaultPayload.role} | Timezone: ${defaultPayload.timezone} | Status: ${defaultPayload.status}\x1b[0m`);
            return existingByEmail;
        } else if (existingById) {
            await User.update(defaultPayload, { where: { id: 1 } });
            console.log(`\x1b[32m✔ [mysql-server] Default user ID 1 updated: ${defaultPayload.email} (${defaultPayload.firstName}) | Role: ${defaultPayload.role} | Timezone: ${defaultPayload.timezone} | Status: ${defaultPayload.status}\x1b[0m`);
            return existingById;
        } else {
            const user = await User.create(defaultPayload);
            console.log(`\x1b[32m✔ [mysql-server] Default user created: ID 1 | ${defaultPayload.email} (${user.firstName}) | Role: ${defaultPayload.role} | Timezone: ${defaultPayload.timezone} | Status: ${defaultPayload.status}\x1b[0m`);
            return user;
        }
    } catch (err) {
        console.warn(`\x1b[33m⚠ [mysql-server] Default user seed note: ${err.message}\x1b[0m`);
    }
};

if (require.main === module) {
    const { connectMySQL, sequelize } = require('../configs/db.config');
    (async () => {
        await connectMySQL();
        await seedDefaultUser();
        await sequelize.close();
        process.exit(0);
    })();
}

module.exports = {
    seedDefaultUser,
};
