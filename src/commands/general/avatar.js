/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed } = require("discord.js");
const { userFromMention } = require("../../helpers/Util.js");
module.exports = {
    name: "avatar",
    aliases: ["dp", "profile"],
    //description: "Get a user's avatar",
    args: false,
    usage: "(mention / user id)",
    cooldown: 5,
    category: "General",
    execute(message, args, guildDB, t) {
        let embed = new MessageEmbed();
        let user;
        if (args[0]) {
            user = userFromMention(args[0], message.client);
        } else {
            user = message.author;
        }
        if (!user) {
            return message.reply(t("errors:invalidUser"));
        }

        embed
            .setTitle(t("cmds:avatar.profile", { user: user.tag }))
            .setImage(user.displayAvatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    },
};
