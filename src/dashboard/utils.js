/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const fetchGuild = async (guildId, client) => {
    let guild;
    try {
        guild = await client.guilds.fetch(guildId);
    } catch (e) {
        guild = null;
    }
    return guild ?? null;
};

const fetchUser = async (userData, client) => {
    if (userData.guilds) {
        for (var i = 0; i < userData.guilds.length; i++) {
            const guild = userData.guilds[i];
            const perms = new Permissions(BigInt(guild.permissions));
            let admin = false;
            if (perms.has(Permissions.FLAGS.MANAGE_GUILD) || guild.owner) {
                admin = true;
            }
            const djsGuild = await fetchGuild(guild.id, client);
            if (djsGuild && djsGuild.id) {
                //guild = djsGuild;
                guild.botInvited = true;
            } else {
                guild.botInvited = false;
            }
            guild.admin = admin;
            guild.manageUrl = `/manage/${guild.id}`;
            guild.iconURL = guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
                : "https://emoji.gg/assets/emoji/discord.png";
            userData.guilds[i] = guild;
        }
        userData.displayedGuilds = userData.guilds.filter((g) => g.admin);
    }
    client.db.findOrCreateUser(userData.id);
    const user = await client.users.fetch(userData.id);
    return { user, userData };
};

const CheckAuth = (req, res, next) => {
    if (req.client.debug) console.log("Checking auth");
    if (!req.user || !req.session.user) {
        const redirectUrl =
            req.originalUrl.includes("login") || req.originalUrl === "/"
                ? "/dashboard"
                : req.originalUrl;
        const state = Math.random().toString(36).substring(5);
        req.client.dashboard.states[state] = redirectUrl;
        return res.redirect(
            `/discord/login?state=${encodeURIComponent(state)}`
        );
    }
    return next();
};

module.exports = {
    fetchGuild,
    fetchUser,
    CheckAuth,
};
