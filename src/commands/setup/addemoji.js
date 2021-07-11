/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = {
    name: "addemoji",
    aliases: ["emoji"],
    //description: "Add emoji from a image link",
    permissions: ["MANAGE_EMOJIS"],
    bot_perms: ["MANAGE_EMOJIS"],
    args: true,
    guildOnly: true,
    usage: "[link] [emoji name]",
    cooldown: 5,
    category: "Setup",
    execute(message, args, guildDB, t) {
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
                                t("cmds:addemoji.success", {
                                    emoji: `${emoji}`,
                                    emojiName: emoji.name,
                                }).split("\n")[1]
                            )
                            .setDesc(
                                t("cmds:addemoji.success", {
                                    emoji: `${emoji}`,
                                    emojiName: emoji.name,
                                }).split("\n")[0]
                            ),
                    ],
                });
            })
            .catch(() => {
                message.channel.send({
                    embeds: [
                        embed.setTitle(
                            t("cmds:addemoji.error", {
                                emojiName: name,
                            }).split("\n")[1]
                        ),
                    ],
                });
            });
    },
};
