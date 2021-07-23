/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const CheckAuth = (req, res, next) => {
    if (!req.user || !req.session.user) {
        const redirectUrl =
            req.originalUrl.includes("login") || req.originalUrl === "/"
                ? "/dashboard"
                : req.originalUrl;
        return res.redirect(
            `/discord/login?redirectUrl=${encodeURIComponent(redirectUrl)}`
        );
    }
    return next();
};
module.exports = {
    CheckAuth,
};
