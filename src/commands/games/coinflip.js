/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    description: "Flips a coin.",
    cooldown: 10,
    category: "Games",
    execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        const coins = {
            heads: "https://i.imgur.com/yStXPCV.png",
            tails: "https://i.imgur.com/kSteyPc.png",
        };
        const sides = ["heads", "tails"];
        const chosenSide = sides[Math.floor(Math.random() * sides.length)];
        let embed = new MessageEmbed()
        .setThumbnail(coins[chosenSide])
        .setDescription(`I've flipped a coin and it landed ${chosenSide}`);
        message.channel.send({embeds: [embed]});
    },
};
