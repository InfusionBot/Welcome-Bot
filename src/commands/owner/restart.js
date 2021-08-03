/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "restart",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 30,
                category: "Owner Only",
            },
            client
        );
    }

    execute({ message, args, guildDB }) {
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
    }
};
