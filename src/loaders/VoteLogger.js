/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const DBL = require("dblapi.js");
module.exports = (client) => {
    const dbl = new DBL(process.env.DBL_token, {
        webhookPort: process.env.DBL_port,
        webhookAuth: process.env.DBL_webhook_pass,
    });
    dbl.webhook.on("vote", async (vote) => {
        const dUser = await client.users.fetch(vote.user);
        let coins = false;
        if (client.config.rewardUserOnVote) {
            const userDB = await client.userDbFuncs.getUser(dUser.id);
            await client.userDbFuncs.updateUser(
                dUser.id,
                "wallet",
                parseInt(userDB.wallet) + 50
            ); //Give user 50 coins
            coins = true;
        }
        if (client.config.votesChannelId) {
            client.channels.cache
                .get(client.config.votesChannelId)
                .send(
                    `⬆️ **${dUser.tag}** (\`${dUser.id}\`) voted for **${
                        client.user.username
                    }** on top.gg ${coins ? " and got 50 wcoins" : ""}🎉!`
                );
        }
    });
};
