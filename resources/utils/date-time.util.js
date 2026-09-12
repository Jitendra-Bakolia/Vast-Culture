const moment = require('moment-timezone');
const { TIMEZONES, DATE_FORMATS } = require('../constants');

const getTimezone = () => process.env.TIMEZONE || TIMEZONES.DEFAULT;

const now = (tz = getTimezone()) => moment().tz(tz);
const nowIso = (tz = getTimezone()) => moment().tz(tz).toISOString();
const nowFormat = (format = DATE_FORMATS.DEFAULT, tz = getTimezone()) => moment().tz(tz).format(format);
const nowUnix = () => moment().unix();
const nowMillis = () => moment().valueOf();
const toDate = (date = undefined, tz = getTimezone()) => (date ? moment(date).tz(tz).toDate() : moment().tz(tz).toDate());

module.exports = {
    moment,
    getTimezone,
    now,
    nowIso,
    nowFormat,
    nowUnix,
    nowMillis,
    toDate,
};
