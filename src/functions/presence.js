/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = function (client) {
    const servers = client.guilds.cache.size;
    const chans = client.channels.cache.size;
    const users = client.users.cache.size;
    client.logger.log(`Updating presence. Servers: ${servers}`, "debug");
    client.user.setPresence({
        activities: [
            {
                name: `${client.defaultPrefix}help | ${servers} server${
                    servers > 1 ? "s" : ""
                } | looking at ${chans} channel${chans > 1 ? "s" : ""}`,
                type: "WATCHING",
            },
        ],
    });
};
