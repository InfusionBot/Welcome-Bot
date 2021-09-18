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
                name: "screenshot",
                aliases: ["ss"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
                slash: true,
                options: [
                    {
                        name: "site",
                        description:
                            "The url of site of which you want a screenshot",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            client
        );
    }

    async execute({ message, args }, t) {
        message.channel.send(await this.req(args[0]));
    }

    async run({ interaction }, t) {
        await interaction.followUp(
            await this.req(interaction.options.getString("site"))
        );
    }

    async req(site) {
        const url = /^(https?:\/\/)/i.test(site) ? site : `http://${site}`;
        const { body } = await require("node-fetch")(
            `https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`
        );
        return { files: [{ attachment: body, name: "Screenshot.png" }] };
    }
};
