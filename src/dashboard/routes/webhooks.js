/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
const giveRewards = (userDB) => {
    userDB.wallet = parseInt(userDB.wallet) + 5000; //Give 5000 coins
    userDB.markModified("wallet");
    userDB.inventory.banknote = parseInt(userDB.inventory.banknote) + 3; //Give 3 banknotes
    userDB.markModified("inventory.banknote");
    return userDB;
};
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
        return (
            console.log("No DONATE_Wtoken set in env") && res.sendStatus(500)
        );
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
    if (!(await client.userDbFuncs.getUser(vUser.id)))
        await client.userDbFuncs.addUser(vUser.id);
    let userDB = await client.userDbFuncs.getUser(vUser.id);
    userDB = giveRewards(userDB);
    await userDB.save();
    const member = client.guilds.cache
        .get(client.config.botGuildId)
        .members.cache.get(vUser.id);
    if (member) member.roles.add(client.config.roles.voters);
    if (process.env.NODE_ENV !== "production") {
        console.log(
            "NODE_ENV not in production so not sending any messages for voting on botlist.space"
        );
        res.sendStatus(200);
        return res.end();
    }
    if (client.config.channels.votes) {
        client.channels.cache
            .get(client.config.channels.votes)
            .send(
                `⬆️ **${vUser.tag}** (\`${vUser.id}\`) voted for **${client.username}** on botlist.space and got 500 WCoins with other rewards 🎉!`
            )
            .catch(console.log);
    } else {
        console.log("No channels.votes in config");
    }
    const t = req.client.i18next.getFixedT(req.locale ?? "en-US");
    vUser
        .send(t("misc:thanks.vote", { site: "botlist.space" }))
        .catch(() => {});
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
        if (!(await client.userDbFuncs.getUser(vUser.id)))
            await client.userDbFuncs.addUser(vUser.id);
        let userDB = await client.userDbFuncs.getUser(vUser.id);
        userDB = giveRewards(userDB);
        await userDB.save();
        const member = client.guilds.cache
            .get(client.config.botGuildId)
            .members.cache.get(vUser.id);
        if (member) member.roles.add(client.config.roles.voters);
        if (client.config.channels.votes) {
            client.channels.cache
                .get(client.config.channels.votes)
                .send(
                    `⬆️ **${vUser.tag}** (\`${vUser.id}\`) voted for **${
                        client.username
                    } ${
                        vote.guild ? "Support server" : "itself"
                    }** on top.gg and got 500 WCoins with other rewards 🎉!`
                )
                .catch(console.log);
        } else {
            console.log("No channels.votes in config");
        }
        const t = req.client.i18next.getFixedT(req.locale ?? "en-US");
        vUser
            .send(t("misc:thanks.vote", { site: "top.gg" }))
            .catch(() => {})
            .catch(() => {});
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
    const user = await client.users.fetch(webhook.raw_buyer_id);
    let member;
    try {
        member = await client.guilds.cache
            .get(client.config.servers.main)
            .members.fetch(user.id);
    } catch (e) {
        member = null;
        if (e.toString().indexOf("Unknown Member") === -1) {
            console.log(e);
        } else {
            const channel = await client.channels
                .fetch(client.config.channels.logs)
                .catch(() => {});
            if (channel)
                channel.send(
                    `A new donator! :tada:, but he didn't join this server, here's the tag of that user: ${user.tag} (${user.id})`
                );
        }
    }
    if (webhook.status.toLowerCase() === "completed") {
        if (member) {
            member.roles.add(client.config.roles.donator);
        }
    }
});
module.exports = router;
