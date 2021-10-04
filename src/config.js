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
    logsChannelId: "855331801635749888",
    suggestionLogsChannelId: "862126837110800414",
    channels: {
        loginLogs: "880122897472036894",
        errorLogs: "878431491581964328",
        newsChannel: "847459283876577360",
        votes: "867925583777103872",
    },
    defaultPrefix: process.env.BOT_PREFIX ?? "w/",
    votersRole: "852512614789808138",
    roles: {
        voteReminder: "886776592666353724",
        voters: "852512614789808138",
    },
    channels: {
        general: "836854115526770711",
    },
    reportsChannelId: "869017115385024543",
    ownerIds: [
        "815204465937481749" /*PuneetGopinath#0001*/,
        "693754859014324295" /*abhijoshi2k#6842*/,
    ],
    dbCacheRefreshInterval: 1 * 60 * 60 * 1000, //refresh db cache every hour
    staffIds: ["772421156787191818" /*Kirito#1555*/],
    dashboard: {
        port: process.env.PORT || 8000,
        secret: process.env.SESS_SECRET ?? null,
        enabled: process.env.SESS_SECRET ?? null ? true : false,
        logs: "855331801635749888",
    },
    site: "https://welcome-bot.github.io/",
    invite: (client) => {
        return client.generateInvite({
            scopes: ["bot", "applications.commands"],
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
    supportGuildInvite: "https://discord.gg/vEUnKUNNRB",
    supportGuildInviteReal: (client) => {
        let invite = client.config.supportGuildInvite;
        try {
            const guild = client.guilds.cache.get(client.config.botGuildId);
            invite = guild.invites.create(guild.systemChannelId);
        } catch (e) {
            invite = client.config.supportGuildInvite;
        }
        return invite;
    },
};
