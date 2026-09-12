const { User } = require('../dao');
const {
    DEFAULT_ADMIN_USER,
    USER_ROLES,
    USER_STATUS,
    TIMEZONES,
} = require('../constants');

const seedDefaultUser = async () => {
    try {
        const defaultPayload = {
            id: DEFAULT_ADMIN_USER.ID,
            email: DEFAULT_ADMIN_USER.EMAIL,
            firstName: DEFAULT_ADMIN_USER.FIRST_NAME,
            mobileNumber: DEFAULT_ADMIN_USER.MOBILE_NUMBER,
            role: USER_ROLES.ADMIN,
            timeZone: TIMEZONES.DEFAULT,
            status: USER_STATUS.ACTIVE,
            isAuthenticated: DEFAULT_ADMIN_USER.IS_AUTHENTICATED,
        };

        const existingByEmail = await User.findOne({ where: { email: defaultPayload.email } });
        const existingById = await User.findByPk(DEFAULT_ADMIN_USER.ID);

        if (existingByEmail) {
            await User.update(defaultPayload, { where: { id: existingByEmail.id } });
            console.log(`\x1b[32m✔ [mysql-server] Default user confirmed: ID ${existingByEmail.id} | ${defaultPayload.email} (${defaultPayload.firstName}) | Role: ${defaultPayload.role} | TimeZone: ${defaultPayload.timeZone} | Status: ${defaultPayload.status}\x1b[0m`);
            return existingByEmail;
        } else if (existingById) {
            await User.update(defaultPayload, { where: { id: DEFAULT_ADMIN_USER.ID } });
            console.log(`\x1b[32m✔ [mysql-server] Default user ID ${DEFAULT_ADMIN_USER.ID} updated: ${defaultPayload.email} (${defaultPayload.firstName}) | Role: ${defaultPayload.role} | TimeZone: ${defaultPayload.timeZone} | Status: ${defaultPayload.status}\x1b[0m`);
            return existingById;
        } else {
            const user = await User.create(defaultPayload);
            console.log(`\x1b[32m✔ [mysql-server] Default user created: ID ${DEFAULT_ADMIN_USER.ID} | ${defaultPayload.email} (${user.firstName}) | Role: ${defaultPayload.role} | TimeZone: ${defaultPayload.timeZone} | Status: ${defaultPayload.status}\x1b[0m`);
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
