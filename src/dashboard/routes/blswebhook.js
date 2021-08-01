/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//POST /blswebhook
router.post("/", async (req, res) => {
    //console.log("/blswebhook");
    if (!process.env.BLS_Wtoken) return res.sendStatus(500);
    if (
        !req.headers.authorization ||
        req.headers.authorization !== process.env.BLS_Wtoken
    )
        return res.sendStatus(401);
    const { client } = req;
    const vUser = await client.users.fetch(req.body.user.id);
    if (!vUser) return;
    await client.userDbFuncs.addUser(vUser.id);
    const userDB = await client.userDbFuncs.getUser(vUser.id);
    await client.userDbFuncs.updateUser(
        vUser.id,
        "wallet",
        parseInt(userDB.wallet) + 500
    ); //Give user 500 coins
    if (client.config.votesChannelId) {
        client.channels.cache
            .get(client.config.votesChannelId)
            .send(
                `⬆️ **${vUser.tag}** (\`${vUser.id}\`) voted for **${client.username}** on botlist.space and got 500 wcoins 🎉!`
            )
            .catch(console.log);
    } else {
        console.log("No votesChannelId in config");
    }
    res.send("OK");
    res.end();
});
module.exports = router;
