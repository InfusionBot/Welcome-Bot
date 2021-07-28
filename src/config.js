/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
const { Permissions } = require("discord.js");
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
    invite: "https://dsc.gg/welcome-bot",
    inviteToGuild: (client, guildId, disableGuildSelect = true) => {
        return client.generateInvite({
            scopes: ["bot"],
            permissions: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.READ_MESSAGE_HISTORY,
                Permissions.FLAGS.EMBED_LINKS,
                Permissions.FLAGS.MANAGE_ROLES,
                Permissions.FLAGS.KICK_MEMBERS,
                Permissions.FLAGS.BAN_MEMBERS,
                Permissions.FLAGS.MANAGE_EMOJIS,
                Permissions.FLAGS.MANAGE_WEBHOOKS,
                Permissions.FLAGS.MANAGE_MESSAGES,
                Permissions.FLAGS.ADD_REACTIONS,
                Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                Permissions.FLAGS.CONNECT,
                Permissions.FLAGS.SPEAK,
            ],
            guild: guildId,
            disableGuildSelect,
        });
    },
};
