/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
const handler = (req, res) => {
    res.sendStatus(405);
    res.end();
};
router
    //GET /webhooks/topgg
    .get("/topgg", handler)
    //GET /webhooks/bls
    .get("/bls", handler)
    //GET /webhooks/donatebot
    .get("/donatebot", handler);
//POST /webhooks/bls
router.post("/bls", async (req, res) => {
    if (!process.env.BLS_Wtoken)
        return console.log("No BLS_Wtoken set in env") && res.sendStatus(500);
    if (
        !req.headers.authorization ||
        req.headers.authorization !== process.env.BLS_Wtoken
    )
        return res.sendStatus(401);
    const { client } = req;
    const vUser = await client.users.fetch(req.body.user.id);
    if (!vUser) {
        res.sendStatus(500);
        return console.log("bls webhook: User not found to give vote rewards");
    }
    if (process.env.NODE_ENV !== "production") {
        console.log(
            "NODE_ENV not in production so not sending any messages for voting on botlist.space"
        );
        res.sendStatus(200);
        return res.end();
    }
    client.economy.emit("voted", vUser, "botlist.space", req.body);
    res.sendStatus(200);
    res.end();
});
const { webhook } = require("../../classes/Topgg");
//POST /webhooks/topgg
router.post(
    "/topgg",
    webhook.listener(async (vote, req, res) => {
        if (vote.type.toLowerCase() === "test")
            return console.log("topggwebhook test success");
        const { client } = req;
        const vUser = await client.users.fetch(vote.user);
        if (!vUser) {
            res.sendStatus(500);
            return console.log(
                "topgg webhook: User not found to give vote rewards"
            );
        }
        client.economy.emit("voted", vUser, "top.gg", vote);
        res.sendStatus(200);
        res.end();
    })
);
//POST /webhooks/donatebot
router.post("/donatebot", async (req, res) => {
    const { client } = req;
    if (!process.env.DONATE_Wtoken)
        return (
            console.log("No DONATE_Wtoken set in env") && res.sendStatus(500)
        );
    if (
        !req.headers.authorization ||
        req.headers.authorization !== process.env.DONATE_Wtoken
    )
        return res.sendStatus(401);
    const webhook = req.data;
    let user;
    try {
        user = await client.users.fetch(webhook?.raw_buyer_id);
    } catch (e) {
        user = null;
    }
    let member;
    try {
        member = await client.guilds.cache
            .get(client.config.servers.main)
            .members.fetch(user?.id);
    } catch (e) {
        member = null;
        if (e.toString().indexOf("Unknown Member") === -1) {
            console.log(e);
        }
    }
    if (webhook.status.toLowerCase() === "completed" && user) {
        if (member) {
            member.roles.add(client.config.roles.donator);
        }
        const channel = await client.channels
            .fetch(client.config.channels.logs)
            .catch(() => {});
        if (channel)
            channel.send(
                `A new donator! :tada:\nDonator details: ${user.tag} (${user.id})`
            );
    }
});
module.exports = router;
