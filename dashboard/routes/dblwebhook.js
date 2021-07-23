/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Topgg = require("@top-gg/sdk");
const express = require("express");
const router = express.Router();
const webhook = new Topgg.Webhook(process.env.DBL_token);
//POST /dblwebhook
router.post(
    "/dblwebhook",
    webhook.listener(async (vote) => {
        const client = req.client;
        const dUser = await client.users.fetch(vote.user);
        await client.userDbFuncs.addUser(dUser.id);
        const userDB = await client.userDbFuncs.getUser(dUser.id);
        await client.userDbFuncs.updateUser(
            dUser.id,
            "wallet",
            parseInt(userDB.wallet) + 50
        ); //Give user 50 coins
        if (client.config.votesChannelId) {
            client.channels.cache
                .get(client.config.votesChannelId)
                .send(
                    `⬆️ **${dUser.tag}** (\`${dUser.id}\`) voted for **${client.user.username}** on top.gg and got 50 wcoins 🎉!`
                );
        }
    })
);
module.exports = router;
