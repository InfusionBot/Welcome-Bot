/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "kids",
    description: "Kiss a user",
    args: true,
    usage: "[mention / user id]",
    cooldown: 3,
    category: "Fun",
    async execute(message, args, guildDB, t) {
        let res = await fetch("https://nekos.life/api/v2/img/kiss");
        res = await res.json();
        const { userFromMention } = require("../../functions/get.js");
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (!isNaN(parseInt(args[0]))) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        }

        if (!user) {
            message.reply(t("errors:userNotFound"));
            return false;
        }
        if (user.id === message.author.id) {
            return message.reply(t("cmds:kiss.errorYourself"));
        }
        let embed = new MessageEmbed()
            .setTitle(
                t("cmds:kiss.success", {
                    author: message.author.tag,
                    user: user.tag,
                })
            )
            .setImage(res.url)
            .setColor("RANDOM");
        message.reply({ embeds: [embed] });
    },
};
