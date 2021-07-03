/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const DBL = require("dblapi.js");
module.exports = (client, logsChannel) => {
    const dbl = new DBL(process.env.DBL_token, {
        webhookPort: process.env.DBL_port,
        webhookAuth: process.env.DBL_webhook_pass,
    });
    dbl.webhook.on("vote", async (vote) => {
        const dUser = await client.users.fetch(vote.user);
        if (logsChannel) {
            logsChannel.send(
                `⬆️ **${dUser.toString()}** (\`${
                    dUser.id
                }\`) voted for **Welcome-Bot** on top.gg!`
            );
        }
    });
};
