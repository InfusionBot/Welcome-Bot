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
                name: "djsdocs",
                aliases: ["djs"],
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
                        name: "query",
                        description: "Search query",
                        type: "STRING",
                        required: true,
                    },
                    {
                        name: "source",
                        description: "Source to use, default: stable",
                        type: "STRING",
                        required: false,
                    },
                ],
            },
            client
        );
        this.VALID_SOURCES = [
            "stable",
            "master",
            "commando",
            "rpc",
            "akairo-master",
            "collection",
        ];
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args }, t) {
        let query = args.join(" ");
        let source = "stable";
        let index = null;
        if (args.find((arg) => arg === "--source"))
            index =
                args.indexOf(args.find((arg) => arg === "--source")) ?? null;
        if (index) {
            if (args[index + 1] && typeof args[index + 1] === "string")
                source = args[index + 1];
            query = query.replace(args[index], "");
        }
        if (!this.VALID_SOURCES.includes(source) && isNaN(parseInt(source))) {
            source = this.VALID_SOURCES[0];
        }
        query = query.replace(source, "");
        const queryParams = new URLSearchParams({ src: source, q: query });
        const json = await this.fetchJson(
            `https://djsdocs.sorta.moe/v2/embed?${queryParams}`
        );
        message.channel.send({
            embeds: [json],
        });
    }

    //eslint-disable-next-line no-unused-vars
    async run({ interaction }, t) {
        const query = interaction.options.getString("query");
        let source = interaction.options.getString("source") ?? null;
        if (!this.VALID_SOURCES.includes(source) && isNaN(parseInt(source))) {
            source = this.VALID_SOURCES[0];
        }
        const queryParams = new URLSearchParams({ src: source, q: query });
        const json = await this.fetchJson(
            `https://djsdocs.sorta.moe/v2/embed?${queryParams}`
        );
        await interaction.followUp({
            embeds: [json],
        });
    }
};
