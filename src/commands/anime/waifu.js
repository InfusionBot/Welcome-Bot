/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "waifu",
    description:
        "Fetches a random waifu (lewd if the channel is NSFW) and displays it.",
    cooldown: 10,
    category: "Anime",
    async execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        embed = new MessageEmbed();
        const fetch = require("node-fetch");
        const waifuAPI = "https://waifu.pics/api";
        const type = message.channel.nsfw ? "nsfw" : "sfw";
        const { url } = await fetch(`${waifuAPI}/${type}/waifu`).then((res) =>
            res.json()
        );
        embed.setImage(url);
        message.channel.send({ embeds: [embed] });
        return;
    },
};
