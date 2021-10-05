/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { channelIdFromMention } = require("../../helpers/Util.js");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "serverlogs",
                aliases: ["server-logs", "logs"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    { name: "disable", desc: "Disable server logs" },
                    { name: "enable", desc: "Enable server logs" },
                    {
                        name: "channel [#channel]",
                        desc: "Set server logs channel",
                    },
                ],
                cooldown: 5,
                category: "Administration",
                slash: false,
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const missingArgs = t("errors:missingArgs", {
            prefix: guildDB.prefix,
            cmd: this.name,
        });
        const embed = new Embed();
        if (args[0]) args[0] = args[0].toLowerCase();

        let channel;

        switch (args[0]) {
            case "channel":
                if (!args[1]) return message.reply(missingArgs);
                channel = args.slice(1).join(" ").replace(" ", "");
                channel = channelIdFromMention(args[1]);
                channel = message.guild.channels.cache.get(channel);
                if (!channel)
                    return message.reply(t("cmds:serverlogs.invalid.channel"));
                guildDB.plugins.serverlogs.channel = channel.id;
                guildDB.markModified("plugins.serverlogs.channel");
                message.reply(
                    t("cmds:serverlogs.set.channel", { channel: `${channel}` })
                );
                break;
            case "disable":
                guildDB.plugins.serverlogs.enabled = false;
                guildDB.markModified("plugins.serverlogs.enabled");
                message.reply(t("cmds:serverlogs.disabled"));
                break;
            case "enable":
                guildDB.plugins.serverlogs.enabled = true;
                guildDB.markModified("plugins.serverlogs.enabled");
                message.reply(t("cmds:serverlogs.enabled"));
                break;
            default:
                if (!args.length) {
                    const channel =
                        message.guild.channels.cache.get(
                            guildDB.plugins.serverlogs.channel
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:serverlogs.current.title"))
                        .setDesc(
                            t("cmds:serverlogs.current.desc", {
                                prefix: guildDB.prefix,
                            })
                        )
                        .addField(t("misc:channel"), `${channel}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    return message.reply(
                        t("errors:invalidSubcmd", {
                            prefix: guildDB.prefix,
                            cmd: this.name,
                        })
                    );
                }
                this.removeCooldown(message.author);
                break;
        }
        await guildDB.save();
    }

    async run({ interaction, guildDB }, t) {
        return;
    }
};
