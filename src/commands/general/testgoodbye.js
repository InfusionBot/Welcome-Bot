/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
const sayGoodBye = require("../../functions/sayGoodBye");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "testgoodbye",
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    execute({ message, args }, t) {
        const result = sayGoodBye(message.member);
        if (
            typeof result === "string" &&
            result.indexOf("channelNotFound") !== -1
        ) {
            message.reply(t("errors:channelDoesntExist"));
        }
        message.react("👍");
    }
};
