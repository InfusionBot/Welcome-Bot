/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
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

    //eslint-disable-next-line no-unused-vars
    execute({ message }) {
        let sentMsg;
        message
            .reply("Restarting...")
            .then((msg) => {
                this.client.destroy();
                sentMsg = msg;
            })
            .then(async () => {
                await this.client.wait(2000); //Sleep for 2 secs
                this.client.login(process.env.DISCORD_TOKEN);
                sentMsg.edit("Restarted!");
            });
    }
};
