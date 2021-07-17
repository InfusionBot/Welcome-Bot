/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor (client) {
        super({
            name: "test",
            memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
            botPerms: [],
            requirements: {
                guildOnly: true,
            },
            disabled: false,
            cooldown: 10,
            category: "General",
        }, client);
    }

    execute({message, args}, t) {
        const greetUser = require("../../functions/greetUser");
        const result = greetUser(message.member);
        if (
            typeof result === "string" &&
            result.indexOf("find channel") !== -1
        ) {
            message.reply(result);
        }
        message.react("👍");
    }
};
