/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "cat",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                },
                disabled: false,
                cooldown: 5,
                category: "Image",
                slash: true,
            },
            client
        );
    }

    async execute({ message } /*, t*/) {
        const image = await require("node-fetch")(
            "http://thecatapi.com/api/images/get?format=src&type=png"
        ).then((res) => res.url);
        message.channel.send({
            embeds: [
                {
                    description: `Cat`,
                    image: {
                        url: image,
                    },
                    color: "RANDOM",
                    timestamp: new Date(),
                },
            ],
        });
    }

    async run({ interaction } /*, t*/) {
        const image = await require("node-fetch")(
            "http://thecatapi.com/api/images/get?format=src&type=png"
        ).then((res) => res.url);
        interaction.followUp({
            embeds: [
                {
                    description: `Cat`,
                    image: {
                        url: image,
                    },
                    color: "RANDOM",
                    timestamp: new Date(),
                },
            ],
        });
    }
};
