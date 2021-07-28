/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const { CheckAuth } = require("../utils");
const router = express.Router();
//GET /manage/:guildId
router.get("/:guildId", CheckAuth, (req, res) => {
    let guildDB;
    try {
        guildDB = req.client.guildDbFuncs.getGuild(req.params.guildId);
    } catch (e) {
        if (process.env.NODE_ENV === "development") console.error(e);
    }
    const guild = userData.displayedGuilds.find((g) => g.id === guildId);
    if (!guild) {
        return res.send({ error: "404", message: "Server/Guild not found" });
    }
    res.render("manage", {
        user: req.user,
        userData: req.userData,
        userDB: req.userDB,
        guildDB,
        guild,
        translate: req.translate,
        currentURL: req.currentURL,
    });
    res.end();
});
module.exports = router;
