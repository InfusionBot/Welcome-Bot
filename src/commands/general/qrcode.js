/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "qrcode",
                aliases: ["qr"],
                memberPerms: [],
                botPerms: [],
                usage: "[subcommand] [data / image_url]",
                requirements: {
                    args: true,
                },
                disabled: false,
                subcommands: [
                    { name: "generate", desc: "Generate a qrcode" },
                    { name: "read", desc: "Read a qrcode" },
                ],
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const fetch = require("node-fetch");
        const embed = new Embed();
        const baseURL = "http://api.qrserver.com/v1";
        if (!args[1])
            return message.reply(
                "Please provide a data / image_url to generate / read a qrcode respectively"
            );
        const body = fetch(
            `${baseURL}/read-qr-code/?fileurl=${encodeURIComponent(args[1]).replace(/\*/g, "%2A")}`
        ).then((res) => res.json());
        switch (args[0]) {
            case "generate":
                return message.channel.send({
                    embeds: [
                        embed.setImage(
                            `${baseURL}/create-qr-code/?data=${encodeURIComponent(
                                args[1]
                            )}`
                        ),
                    ],
                });
                break;
            case "read":
                if (!args[1].startsWith("http"))
                    return message.reply(t("errors:invalidURL"));
                if (body[0].symbol[0] && body[0].symbol[0].data !== null) {
                    return message.channel.send({
                        embeds: [embed.setDescription(body[0].symbol[0].data)],
                    });
                }
                break;
            default:
                message.reply("Please provide a valid subcommand");
                break;
        }
    }
};
