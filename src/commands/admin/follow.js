/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { channelIdFromMention } = require("../../helpers/Util.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "follow",
                aliases: ["getnews"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [Permissions.FLAGS.MANAGE_WEBHOOKS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Administration",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB }, t) {
        let channelId;
        if (args[0].startsWith("<#")) {
            channelId = channelIdFromMention(args[0]);
        } else if (typeof args[0] === "number") {
            channelId = args[0];
        } else {
            message.reply(t("errors:invalidChannel"));
        }
        message.client.channels.cache
            .get(message.client.config.channels.newsChannel)
            .addFollower(channelId)
            .catch((err) => {
                console.error(err);
                message.reply(t("errors:generic"));
            });
        message.channel.send(t("cmds:follow.success"));
    }
};
