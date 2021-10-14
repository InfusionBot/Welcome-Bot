/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions, Util } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "stealemoji",
                memberPerms: [Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
                botPerms: [Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
                slash: false,
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const embed = new Embed({ color: "success", timestamp: true });
        for (const rawEmoji of args) {
            const emoji = Util.parseEmoji(rawEmoji);
            if (emoji.id) {
                const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${
                    emoji.animated ? "gif" : "png"
                }`;
                message.guild.emojis
                    .create(url, emoji.name)
                    .then((createdEmoji) => {
                        message.channel.send({
                            embeds: [
                                embed
                                    .setTitle(
                                        `${t("cmds:stealemoji.success", {
                                            emoji: `${createdEmoji}`,
                                        })}`
                                    )
                                    .setDesc(`${createdEmoji}`),
                            ],
                        });
                    })
                    .catch(() => {
                        message.channel.send({
                            embeds: [
                                embed.setTitle(
                                    `${
                                        t("cmds:stealemoji.error", {
                                            emojiName: `${emoji.name}`,
                                        }).split("\n")[1]
                                    }`
                                ),
                            ],
                        });
                    });
            }
        }
    }
};
