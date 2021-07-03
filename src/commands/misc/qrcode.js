/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "qrcode",
    aliases: ["qr"],
    //description: "Generate/Read a qrcode",
    usage: "[subcommand] [data / image_url]",
    subcommand: true,
    subcommands: [
        { name: "generate", desc: "Generate a qrcode" },
        { name: "read", desc: "Read a qrcode" },
    ],
    cooldown: 10,
    category: "Miscellaneous",
    async execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        const fetch = require("node-fetch");
        let embed = new MessageEmbed();
        const baseURL = "http://api.qrserver.com/v1";
        if (!args[1])
            return message.reply(
                "Please provide a data / image_url to generate / read a qrcode respectively"
            );
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
                if (
                    !(
                        args[1].startsWith("http://") |
                        args[1].startsWith("https://")
                    )
                )
                    return message.reply(
                        "Invalid Image url, check whether your url includes protocol"
                    );
                const body = await fetch(
                    `${baseURL}/read-qr-code/?fileurl=${encodeURIComponent(
                        args[1]
                    ).replace(/\*/g, "%2A")}`
                ).then((res) => res.json());
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
    },
};
