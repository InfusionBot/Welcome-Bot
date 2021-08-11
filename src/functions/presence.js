/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = function (client) {
    const servers = client.guilds.cache.size;
    const commands = client.commands.enabled.size;
    const users = client.users.cache.size;
    const channels = client.channels.cache.size;
    const presences = [
        {
            name: `${servers} server${servers > 1 ? "s" : ""} | ${
                client.config.defaultPrefix
            }help`,
            type: "WATCHING",
        },
        {
            name: `${commands} command${commands > 1 ? "s" : ""} | ${
                client.config.defaultPrefix
            }help`,
            type: "PLAYING",
        },
        {
            name: `${channels} channel${channels > 1 ? "s" : ""} | ${
                client.config.defaultPrefix
            }help`,
            type: "LISTENING",
        },
        {
            name: `${users} user${users > 1 ? "s" : ""} | ${
                client.config.defaultPrefix
            }help`,
            type: "WATCHING",
        },
        {
            name: `${client.user.username} v${client.package.version} | ${client.config.defaultPrefix}help`,
            type: "PLAYING",
        },
    ];
    client.user.setPresence({
        activities: [presences[Math.floor(Math.random() * presences.length)]],
    });
};
