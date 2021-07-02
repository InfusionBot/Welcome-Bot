/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "restart",
    //description: "Restart the bot",
    cooldown: 30,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args) {
        let sentMsg;
        message
            .reply("Restarting...")
            .then((msg) => {
                message.client.destroy();
                sentMsg = msg;
            })
            .then(async () => {
                message.client.wait(5000); //Sleep for 5 secs
                message.client.login(process.env.DISCORD_TOKEN);
                sentMsg.edit("Restarted!");
            });
    },
};
