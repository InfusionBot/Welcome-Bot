/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
const btoa = require("btoa");
const fetch = require("node-fetch");
//GET /login
router.get("/login", (req, res) => {
    if (req.user) res.redirect("/dasboard");
    else
        req.redirect(
            `https://discord.com/api/oauth2/authorize?client_id=${
                req.client.user.id
            }&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(
                req.get("host") + "/discord/callback"
            )}&redirectUrl=${req.query.redirectUrl || encodeURIComponent("/dashboard")}`
        );
});
//GET /callback
router.get("/callback", (req, res) => {
    if (!req.query.code) return res.redirect("/");
    const redirectUrl = req.query.redirectUrl || "/dashboard";
    const params = new URLSearchParams();
    params
        .set("grant_type", "authorization_code")
        .set("code", req.query.code)
        .set("redirect_uri", "/discord/callback");
    let tokens;
    fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: params.toString(),
        headers: {
            Authorization: `Basic ${btoa(req.client.user.id)}`,
            "User-Agent": process.env.userAgent,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
});
module.exports = router;
