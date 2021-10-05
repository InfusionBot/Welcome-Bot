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
                name: "welcome",
                aliases: ["welcomelogs"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    { name: "disable", desc: "Disable welcome logs" },
                    { name: "enable", desc: "Enable welcome logs" },
                    { name: "message", desc: "Set welcome message" },
                    { name: "channel [#channel]", desc: "Set welcome channel" },
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

        let channel, message2;

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
                    return message.reply(t("cmds:welcome.invalid.channel"));
                guildDB.plugins.welcome.channel = channel.id;
                guildDB.markModified("plugins.welcome.channel");
                message.reply(
                    t("cmds:welcome.set.channel", { channel: `${channel}` })
                );
                break;
            case "message":
                if (!args[1]) return message.reply(missingArgs);
                message2 = args.join(" ").replace(`${args[0] ?? ""} `, "");
                guildDB.plugins.welcome.message = message2.trim();
                guildDB.markModified("plugins.welcome.message");
                message.reply(
                    t("cmds:welcome.set.message", { message: message2 })
                );
                break;
            case "disable":
                guildDB.plugins.welcome.enabled = false;
                guildDB.markModified("plugins.welcome.enabled");
                message.reply(t("cmds:welcome.disabled"));
                break;
            case "enable":
                guildDB.plugins.welcome.enabled = true;
                guildDB.markModified("plugins.welcome.enabled");
                message.reply(t("cmds:welcome.enabled"));
                break;
            default:
                if (!args.length) {
                    const channel =
                        message.guild.channels.cache.get(
                            guildDB.plugins.welcome.channel
                        ) ?? t("misc:not_set");
                    embed
                        .setTitle(t("cmds:welcome.current.title"))
                        .setDesc(
                            t("cmds:welcome.current.desc", {
                                prefix: guildDB.prefix,
                            })
                        )
                        .addField(t("misc:channel"), `${channel}`)
                        .addField(
                            t("misc:message"),
                            `\`\`\`\n${guildDB.plugins.welcome.message}\n\`\`\``
                        );
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
