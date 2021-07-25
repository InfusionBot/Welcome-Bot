/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
const { webhook } = require("../../src/classes/Topgg");
//POST /dblwebhook
router.post(
    "/dblwebhook",
    webhook.listener(async (vote, req, res) => {
        const client = req.client;
        const dUser = await client.users.fetch(vote.user);
        await client.userDbFuncs.addUser(dUser.id);
        const userDB = await client.userDbFuncs.getUser(dUser.id);
        await client.userDbFuncs.updateUser(
            dUser.id,
            "wallet",
            parseInt(userDB.wallet) + 500
        ); //Give user 500 coins
        if (client.config.votesChannelId) {
            client.channels.cache
                .get(client.config.votesChannelId)
                .send(
                    `⬆️ **${dUser.tag}** (\`${dUser.id}\`) voted for **${client.user.username}** on top.gg and got 500 wcoins 🎉!`
                ).catch(console.log);
        } else {
            console.log("No votesChannelId in config");
        }
        res.send("OK");
    })
);
module.exports = router;
