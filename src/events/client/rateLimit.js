/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "rateLimit",
    once: false,
    execute(client, info) {
        client.logger.log("You are being rate limited!", "warn");
        client.logger.log(JSON.stringify(info, null, 4), "warn");
    },
};
