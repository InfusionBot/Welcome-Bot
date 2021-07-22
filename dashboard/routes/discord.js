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
    if (req.user) res.redirect("/dashboard");
    else
        req.redirect(
            `https://discord.com/api/oauth2/authorize?client_id=${
                req.client.user.id
            }&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get("host")}/discord/callback&redirectUrl=${req.query.redirectUrl || "/dashboard"}`)}`
        )
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
            Authorization: `Basic ${btoa(`${req.client.user.id}:${req.client.config.dashboard.secret}`)}`,
            "User-Agent": process.env.userAgent,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(async (res) => {
        tokens = await res.json();
    }).catch(console.error);
    if (tokens.error || !tokens.access_token) return res.redirect(`/discord/login&redirectUrl=${req.query.redirectUrl || "/dashboard"}`);
});
module.exports = router;
