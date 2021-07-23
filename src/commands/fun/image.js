/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "image",
                aliases: ["random-image"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Fun",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const randomImage = require("../../functions/randomImage.js");
        const url = await randomImage().catch((err) => {
            console.error(err);
            message.reply(t("errors:generic"));
        });
        if (url.startsWith("http")) {
            let image = new Embed().setImage(url);
            return message.channel.send({ embeds: [image] });
        }
        message.reply(t("errors:generic"));
    }
};
