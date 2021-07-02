/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "8ball",
    aliases: ["eightball"],
    description: "Get your fortune by asking your question",
    args: true,
    usage: "[question]",
    cooldown: 3,
    category: "Games",
    async execute(message, args, guildDB, t) {
        let res = await fetch("https://nekos.life/api/v2/8ball");
        res = await res.json();
        const text = args.join(" ");
        let embed = new MessageEmbed()
            .setTitle(
                text
            )
            .setDescription(res.response)
            .setImage(res.url)
            .setColor("RANDOM");
        message.reply({ embeds: [embed] });
    },
};
