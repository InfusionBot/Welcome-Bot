/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const { CheckAuth } = require("../utils");
const router = express.Router();
//GET /manage/:guildId
router.get("/:guildId", CheckAuth, async (req, res) => {
    let guildDB;
    try {
        guildDB = await req.client.guildDbFuncs.getGuild(req.params.guildId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    const guild = req.client.guilds.cache.get(req.params.guildId);
    if (
        !guild ||
        !req.userData.displayedGuilds ||
        !req.userData.displayedGuilds.find(
            (g) => g.id === req.params.guildId
        ) ||
        !guildDB
    ) {
        return res.render("404", {
            user: req.user,
            userData: req.userData,
            userDB: req.userDB,
            translate: req.translate,
            currentURL: req.currentURL,
        });
    }
    const guild2 = req.userData.displayedGuilds.find(
        (g) => g.id === req.params.guildId
    );
    res.render("manage", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        guildDB,
        guild: { ...guild2, ...guild },
        dclient: req.client,
        translate: req.translate,
        currentURL: req.currentURL,
        csrfToken: req.csrfToken(),
    });
    res.end();
});
//POST /manage/:guildId
router.post("/:guildId", CheckAuth, async (req, res) => {
    let guildDB;
    try {
        guildDB = await req.client.guildDbFuncs.getGuild(req.params.guildId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    const guild = req.client.guilds.cache.get(req.params.guildId);
    if (
        !guild ||
        !req.userData.displayedGuilds ||
        !req.userData.displayedGuilds.find(
            (g) => g.id === req.params.guildId
        ) ||
        !guildDB
    ) {
        return res.render("404", {
            user: req.user,
            userData: req.userData,
            userDB: req.userDB,
            translate: req.translate,
            currentURL: req.currentURL,
        });
    }
    const data = req.body;
    if (
        Object.hasOwnProperty.call(data, "prefix") &&
        data.prefix.length >= 1 &&
        data.prefix.length < 50
    ) {
        guildDB.prefix = `${data.prefix}`;
        guildDB.markModified("prefix");
    }
    if (Object.hasOwnProperty.call(data, "language")) {
        const language = req.client.languages.find(
            (l) =>
                l.name === data.language ||
                l.aliases.includes(data.language) ||
                l.aliases.includes(data.language.toLowerCase())
        )?.name;
        if (language) {
            guildDB.lang = `${language}`;
            guildDB.markModified("lang");
        }
    }
    if (
        Object.prototype.hasOwnProperty.call(data, "welcomeEnable") ||
        Object.prototype.hasOwnProperty.call(data, "welcomePlugin")
    ) {
        guildDB.plugins.welcome = {
            enabled: true,
            message: data.message.substring(
                0,
                req.client.config.plugins.welcome.msgLength
            ),
            channel: guild.channels.cache.find((ch) => ch.name === data.channel)
                .id,
        };
        guildDB.markModified("plugins.welcome");
    }
    if (Object.prototype.hasOwnProperty.call(data, "welcomeDisable")) {
        guildDB.plugins.welcome = {
            enabled: false,
            message:
                "Welcome {mention} to the {server} server!\nYou are our #{members_formatted} member",
            channel: "new-members",
        };
        guildDB.markModified("plugins.welcome");
    }
    if (
        Object.prototype.hasOwnProperty.call(data, "goodbyeEnable") ||
        Object.prototype.hasOwnProperty.call(data, "goodbyePlugin")
    ) {
        guildDB.plugins.goodbye = {
            enabled: true,
            message: data.message.substring(
                0,
                req.client.config.plugins.goodbye.msgLength
            ),
            channel: guild.channels.cache.find((ch) => ch.name === data.channel)
                .id,
        };
        guildDB.markModified("plugins.goodbye");
    }
    if (Object.prototype.hasOwnProperty.call(data, "goodbyeDisable")) {
        guildDB.plugins.goodbye = {
            enabled: false,
            message:
                "Good Bye {mention}!\nWe are sad to see you go!\nWithout you, we are {members} members",
            channel: null,
        };
        guildDB.markModified("plugins.goodbye");
    }
    await guildDB.save();
    res.redirect(303, "/manage/" + guild.id);
});
module.exports = router;