const requestIp = require('request-ip');

/**
 * Extracts and normalizes client IP, user agent, and device information from the incoming Express request.
 * @param {import('express').Request} req
 * @returns {object}
 */
const extractClientInfo = (req) => {
    const clientIp = requestIp.getClientIp(req) || req.clientIp || req.ip || null;
    const ua = req.useragent || {};

    let device = 'Desktop';
    if (ua.isMobile) device = 'Mobile';
    else if (ua.isTablet) device = 'Tablet';
    else if (ua.isDesktop) device = 'Desktop';
    else if (ua.isBot) device = 'Bot';

    return {
        clientIp,
        browser: ua.browser || null,
        browserVersion: ua.version || null,
        os: ua.os || null,
        platform: ua.platform || null,
        device,
        userAgent: ua.source || req.headers?.['user-agent'] || null,
    };
};

module.exports = {
    extractClientInfo,
};
