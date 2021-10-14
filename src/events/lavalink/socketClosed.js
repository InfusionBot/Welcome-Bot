/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "socketClosed",
    once: false,
    execute: (client, player, payload) => {
        if (payload.byRemote == true) {
            player.destroy();
        }
        client.logger.error(
            `Socket has been closed because ${payload.reason} in [${player.guild}]`
        );
    },
};
