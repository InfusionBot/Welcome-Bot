/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fetch = require("node-fetch");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "waifu",
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 5,
                category: "Anime",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const embed = new Embed();
        const type = message.channel.nsfw ? "nsfw" : "sfw"; //lewd if the channel is NSFW
        const { url } = await fetch(
            `https://waifu.pics/api/${type}/waifu`
        ).then((res) => res.json());
        embed.setImage(url);
        message.reply({ embeds: [embed] });
        return;
    }
};
