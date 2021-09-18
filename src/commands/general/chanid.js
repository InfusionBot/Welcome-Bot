/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { channelIdFromMention } = require("../../helpers/Util.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "chanid",
                aliases: ["channel-id"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        const channelId = channelIdFromMention(args[0]);
        const channel = await message.guild.channels.fetch(channelId);
        if (!channel) return message.reply(t("errors:invalidChannel"));
        message.channel.send(`${channelId}`);
    }
};
