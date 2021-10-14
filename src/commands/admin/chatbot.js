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
                name: "chatbot",
                aliases: ["chat"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    { name: "disable", desc: "Disable chatbot" },
                    { name: "enable", desc: "Enable chatbot" },
                    { name: "channel [#channel]", desc: "Set chatbot channel" },
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
                channel = channelIdFromMention(args[1]);
                channel = message.guild.channels.cache.get(channel);
                if (!channel)
                    return message.reply(t("cmds:chatbot.invalid.channel"));
                guildDB.plugins.chatbot.channel = channel.id;
                guildDB.markModified("plugins.chatbot.channel");
                message.reply(
                    t("cmds:chatbot.set.channel", { channel: `${channel}` })
                );
                break;
            case "disable":
                guildDB.plugins.chatbot.enabled = false;
                guildDB.markModified("plugins.chatbot.enabled");
                message.reply(t("cmds:chatbot.disabled"));
                break;
            case "enable":
                guildDB.plugins.chatbot.enabled = true;
                guildDB.markModified("plugins.chatbot.enabled");
                message.reply(t("cmds:chatbot.enabled"));
                break;
            default:
                if (!args.length) {
                    const channel =
                        message.guild.channels.cache.get(
                            guildDB.plugins.chatbot.channel
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:chatbot.current.title"))
                        .setDesc(
                            t("cmds:chatbot.current.desc", {
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
