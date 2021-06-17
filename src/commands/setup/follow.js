/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "follow",
    aliases: ["getnews"],
    description: "Get news and version updates to this bot.",
    permissions: [Permissions.FLAGS.MANAGE_SERVER],
    bot_perms: [Permissions.FLAGS.MANAGE_WEBHOOKS],
    guildOnly: true,
    args: true,
    usage: "[channel / channel id]",
    cooldown: 10,
    category: "Setup",
    execute(message, args, guildDB) {
        const { channelIdFromMention } = require("../../functions/get.js");
        let channelId;
        if (args[0].startsWith("<#")) {
            channelId = channelIdFromMention(args[0]);
        } else if (typeof args[0] === "number") {
            channelId = args[0];
        } else {
            message.reply("Please provide a proper channel which exists.");
        }
        message.client.guilds.cache
            .get(message.client.botServerId)
            .channels.cache.get(message.client.newsChannelId)
            .addFollower(channelId)
            .catch((err) => {
                console.error(err);
                message.reply("An error occurred");
            });
        message.channel.send("Successfully followed");
    },
};
