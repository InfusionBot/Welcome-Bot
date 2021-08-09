/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "addemoji",
                aliases: ["emoji"],
                memberPerms: [Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
                botPerms: [Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    execute({ message, args, guildDB }, t) {
        if (!args[0].startsWith("http"))
            return message.reply(t("errors:invalidURL"));
        const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
        const embed = new Embed({ color: "success", timestamp: true });
        if (!name) {
            return message.reply(
                t("cmds:addemoji.nameMissing", {
                    cmd: `${guildDB.prefix}help addemoji`,
                })
            );
        }
        if (name.length < 2 || name.length > 32) {
            return message.reply(t("cmds:addemoji.invalidName"));
        }
        message.guild.emojis
            .create(args[0], name)
            .then((emoji) => {
                message.channel.send({
                    embeds: [
                        embed
                            .setTitle(
                                `${
                                    t("cmds:addemoji.success", {
                                        emoji: `${emoji}`,
                                        emojiName: `${emoji.name}`,
                                        emojiId: emoji.id
                                    })
                                }`
                            )
                            .setDesc(`${emoji}`)
                            ),
                    ],
                });
            })
            .catch(() => {
                message.channel.send({
                    embeds: [
                        embed.setTitle(
                            `${
                                t("cmds:addemoji.error", {
                                    emojiName: `${name}`,
                                }).split("\n")[1]
                            }`
                        ),
                    ],
                });
            });
    }
};
