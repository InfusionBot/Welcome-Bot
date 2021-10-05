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
                name: "modlogs",
                aliases: ["modlog"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                subcommands: [
                    { name: "set [#channel]", desc: "Set ModLogs channel" },
                ],
                disabled: false,
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
        const subcommand = args[0] ? args[0].toLowerCase() : "";
        const embed = new Embed();
        let channel = args
            .join(" ")
            .replace(`${args[0] ?? ""} `, "")
            .replace(" ", ""); //replace empty space as there is no empty space in a channel name
        switch (subcommand) {
            case "set":
                if (!args[1]) return message.reply(missingArgs);
                if (args[1].startsWith("<#") && isNaN(parseInt(args[1]))) {
                    channel = channelIdFromMention(args[1]);
                } else {
                    channel = message.guild.channels.cache.find(
                        (ch) => ch.name === channel
                    ).id;
                }
                channel = message.guild.channels.cache.get(channel);
                guildDB.plugins.modlogs = channel.id;
                guildDB.markModified("plugins.modlogs");
                message.reply(
                    t("cmds:modlogs.channelSet", { channel: `${channel}` })
                );
                break;
            default:
                if (!args.length) {
                    const channel =
                        message.guild.channels.cache.get(
                            guildDB.plugins.modlogs
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:modlogs.current.title"))
                        .setDesc(
                            t("cmds:modlogs.current.desc", {
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
                break;
        }
        await guildDB.save();
    }
};
