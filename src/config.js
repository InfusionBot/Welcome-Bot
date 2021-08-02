/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
//const { Permissions } = require("discord.js");
const defaultPerms = require("./data/defaultPerms");
module.exports = {
    botGuildId: "836854115526770708",
    newsChannelId: "847459283876577360",
    logsChannelId: "855331801635749888",
    votesChannelId: "867925583777103872",
    suggestionLogsChannelId: "862126837110800414",
    reportsChannelId: "869017115385024543",
    ownerIDs: [
        "815204465937481749" /*PuneetGopinath#0001*/,
        "693754859014324295" /*abhijoshi2k#6842*/,
    ],
    dashboard: {
        port: process.env.PORT || 8000,
        secret: process.env.SESS_SECRET ?? null,
        enabled: process.env.SESS_SECRET ?? null ? true : false,
        logs: "855331801635749888",
    },
    invite: (client) => {
        return client.generateInvite({
            scopes: ["bot"],
            permissions: defaultPerms,
        });
    },
    inviteToGuild: (client, guildId, disableGuildSelect = true) => {
        return client.generateInvite({
            scopes: ["bot"],
            permissions: defaultPerms,
            guild: guildId,
            disableGuildSelect,
        });
    },
    plugins: {
        welcome: {
            msgLength: 50, //max welcome msg length
        },
        goodbye: {
            msgLength: 50, //max goodbye msg length
        },
    },
};
