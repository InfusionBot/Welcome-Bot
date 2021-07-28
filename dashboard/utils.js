/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const fetchGuild = async (guildId, client) => {
    const guild = await client.guilds.fetch(guildId);
    return guild ?? null;
};

const fetchUser = async (userData, client) => {
    if (userData.guilds) {
        userData.guilds.forEach(async (guild) => {
            const perms = new Permissions(BigInt(guild.permissions));
            if (perms.has(Permissions.FLAGS.MANAGE_GUILD)) {
                guild.admin = true;
            }
            guild.manageUrl = `/manage/${guild.id}`;
            guild.botInvited = true;
            const djsGuild = await fetchGuild(guild.id, client);
            if (djsGuild && djsGuild.id) guild = { ...guild, ...djsGuild };
            else guild.botInvited = false;
        });
        userData.displayedGuilds = userData.guilds.filter((g) => g.admin);
    }
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
        return res.redirect(
            `/discord/login?redirectUrl=${encodeURIComponent(redirectUrl)}`
        );
    }
    return next();
};
module.exports = {
    fetchGuild,
    fetchUser,
    CheckAuth,
};
