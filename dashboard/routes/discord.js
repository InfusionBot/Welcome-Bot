/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//GET /login
router.get("/login", (req, res) => {
    if (req.user) res.redirect("/dasboard");
    else
        req.redirect(
            `https://discord.com/api/oauth2/authorize?client_id=${
                req.client.user.id
            }&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(
                req.get("host") + "/discord/callback"
            )}&state=${req.query.state || "no"}`
        );
});
//GET /callback
router.get("/callback", (req, res) => {
    res.send("Coming soon");
});
module.exports = router;
