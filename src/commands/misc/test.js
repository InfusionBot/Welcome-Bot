/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "test",
    //aliases: [],
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    //description: "Test welcome message",
    args: false,
    guildOnly: true,
    category: "Miscellaneous",
    execute(message, args) {
        const greetUser = require("../../functions/greetUser");
        const result = greetUser(message.member);
        if (typeof result === "string" && result.indexOf("find channel") !== -1) {
            message.reply(result);
        }
        message.react("👍");
    },
};
