/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "debug",
    once: false,
    execute(client, info) {
        if (
            !info.match(/\b(?:heartbeat|token|connect)\b/gi) &&
            client.debug &&
            client.debugLevel > 0
        )
            client.logger.log(info, "debug", ["DISCORD"]);
    },
};
