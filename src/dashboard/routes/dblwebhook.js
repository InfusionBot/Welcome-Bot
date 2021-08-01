/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const express = require("express");
const router = express.Router();
//POST /dblwebhook
router.post("/", async (req, res) => {
    console.log("/dblwebhook");
    if (!process.env.DBL_Wtoken) return res.sendStatus(500);
    if (
        !req.headers.authorization ||
        req.headers.authorization !== process.env.DBL_Wtoken
    )
        return res.sendStatus(401);
    const { client } = req;
    const vUser = await client.users.fetch(req.body.id);
    if (!vUser) return;
    let userDB = await client.userDbFuncs.getUser(vUser.id);
    if (!userDB) await client.userDbFuncs.addUser(vUser.id);
    userDB = await client.userDbFuncs.getUser(vUser.id);
    userDB.wallet = parseInt(userDB.wallet) + 500; //Give user 500 coins
    userDB.markModified("wallet");
    await userDB.save();
    if (client.config.votesChannelId) {
        client.channels.cache
            .get(client.config.votesChannelId)
            .send(
                `⬆️ **${vUser.tag}** (\`${vUser.id}\`) voted for **${client.username}** on discordbotlist.com and got 500 wcoins 🎉!`
            )
            .catch(console.log);
    } else {
        console.log("No votesChannelId in config");
    }
    res.send("OK");
    res.end();
});
module.exports = router;
