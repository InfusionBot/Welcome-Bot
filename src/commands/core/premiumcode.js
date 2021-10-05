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
                name: "premiumcode",
                aliases: ["use-code"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Core",
                slash: false,
            },
            client
        );
    }

    execute({ message, args, guildDB, userDB }, t) {
        return message.channel.send("Sorry this command is not ready still");
    }

    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
