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
                name: "gtn",
                aliases: ["guess-the-number"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    {
                        name: "start [min] [max]",
                        desc: "Start guess the number event",
                    },
                    {
                        name: "channel [#channel]",
                        desc: "Set guess the number channel",
                    },
                ],
                cooldown: 5,
                category: "Administration",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB }, t) {
        const missingArgs = t("errors:missingArgs", {
            prefix: guildDB.prefix,
            cmd: this.name,
        });
        const embed = new Embed();
        if (args[0]) args[0] = args[0].toLowerCase();

        let channel, number;

        switch (args[0]) {
            case "channel":
                if (!args[1]) return message.reply(missingArgs);
                channel = args.slice(1).join(" ").replace(" ", "");
                if (args[1].startsWith("<#") && isNaN(parseInt(args[1]))) {
                    channel = channelIdFromMention(args[1]);
                } else {
                    channel = message.guild.channels.cache.find(
                        (ch) => ch.name === channel
                    )?.id;
                }
                channel = message.guild.channels.cache.get(channel);
                if (!channel)
                    return message.reply(t("cmds:gtn.invalid.channel"));
                guildDB.plugins.gtn.channel = channel.id;
                guildDB.markModified("plugins.wegtnlcome.channel");
                message.reply(
                    t("cmds:gtn.set.channel", { channel: `${channel}` })
                );
                break;
            case "start":
                if (!args[1] || !args[2]) return message.reply(missingArgs);
                if (isNaN(args[1]) || isNaN(args[2]))
                    return message.reply(t("cmds:gtn.invalid.number"));
                number = this.client.util.randomNum(
                    Number(args[1]),
                    Number(args[2])
                );
                guildDB.plugins.gtn.number = number;
                guildDB.plugins.gtn.ongoing = true;
                guildDB.plugins.gtn.min = Number(args[1]);
                guildDB.plugins.gtn.max = Number(args[2]);
                message.author.send(t("cmds:gtn.dm", { number }));
                this.client.commands.enabled.get("unlock").execute({
                    message: {
                        guild: message.guild,
                        channel: message.guild.channels.cache.get(
                            guildDB.plugins.gtn.channel
                        ),
                    },
                    noReply: true,
                });
                message.reply(t("cmds:gtn.started"));
                break;
            case "stop":
                guildDB.plugins.gtn.ongoing = false;
                guildDB.plugins.gtn.number = 0;
                message.reply(t("cmds:gtn.stopped"));
                break;
            default:
                if (!args.length) {
                    const channel =
                        message.guild.channels.cache.get(
                            guildDB.plugins.gtn.channel
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:gtn.current.title"))
                        .setDesc(
                            t("cmds:gtn.current.desc", {
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
};
