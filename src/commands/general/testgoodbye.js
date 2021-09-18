/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
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

    //eslint-disable-next-line no-unused-vars
    async execute({ message }, t) {
        const sayGoodBye = require("../../functions/sayGoodBye");
        const result = await sayGoodBye(message.member);
        if (result === "channelNotFound") {
            return message.reply(t("errors:channelDoesntExist"));
        } else if (result === "disabled") {
            return message.reply(t("cmds:testgoodbye.goodbyeDisabled"));
        }
        message.react("👍");
    }
};
