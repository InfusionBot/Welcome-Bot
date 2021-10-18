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
                name: "8ball",
                aliases: ["eight-ball", "8b", "8-ball"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Fun",
                slash: true,
                options: [
                    {
                        name: "question",
                        description: "Question to ask",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            client
        );
    }

    async execute({ message, args }, t) {
        //TODO: Add translation
        let res = await fetch("https://nekos.life/api/v2/8ball");
        res = await res.json();
        const text = args.join(" ");
        const embed = new Embed()
            .setTitle(text)
            .setDescription(`**${res.response}**`)
            .setImage(res.url);
        message.reply({ embeds: [embed] });
    }

    async run({ interaction }, t) {
        //TODO: Add translation
        let res = await fetch("https://nekos.life/api/v2/8ball");
        res = await res.json();
        const text = args.join(" ");
        const embed = new Embed()
            .setTitle(text)
            .setDescription(`**${res.response}**`)
            .setImage(res.url);
        interaction.followUp({ embeds: [embed] });
    }
};
