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
    res.render("manage", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        guildDB,
        guild: req.userData.displayedGuilds.find(
            (g) => g.id === req.params.guildId
        ),
        dclient: req.client,
        djsGuild: guild,
        translate: req.translate,
        currentURL: req.currentURL,
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
    if (data.prefix.length >= 1 && data.prefix.length < 100) {
        guildDB.prefix = `${data.prefix}`;
    }
    if (data.language) {
        const language = req.client.languages.find(
            (l) =>
                l.name === args[0] ||
                l.aliases.includes(args[0]) ||
                l.aliases.includes(args[0].toLowerCase())
        ).name;
        if (language) {
            guildDB.lang = `${language}`;
        }
    }
    await guildDB.save();
    res.redirect(303, "/manage/" + guild.id);
});
module.exports = router;
