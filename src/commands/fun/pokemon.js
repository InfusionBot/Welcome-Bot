/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "pokemon",
    aliases: ["pokémon"],
    description: "Get a pokemon image",
    cooldown: 10,
    args: true,
    usage: "[pokemon character]",
    category: "Fun",
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const randomImage = require("../../functions/randomImage.js");
        const url = await randomImage(args[0]).catch((err) => {
            console.error(err);
            message.reply("Oh! Could not find that Pokemon");
        });
        if (url && url.startsWith("http")) {
            let image = new MessageEmbed();
            image.setImage(url);
            message.channel.send({ embeds: [image] });
            return;
        }
    },
};
