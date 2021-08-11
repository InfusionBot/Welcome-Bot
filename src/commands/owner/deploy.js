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
                name: "deploy",
                aliases: ["addslash"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Owner Only",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        await client.application.commands.set([
            {
                name: "ping",
                description: "Shows my ping!",
            },
        ]);
    }
};
