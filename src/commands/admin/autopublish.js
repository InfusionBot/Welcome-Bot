/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "autopublish",
                aliases: ["ap"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                disabled: false,
                subcommands: [
                    { name: "disable", desc: "Disable autopublish" },
                    { name: "enable", desc: "Enable autopublish" },
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

        switch (args[0]) {
            case "disable":
                guildDB.plugins.autopublish = false;
                guildDB.markModified("plugins.autopublish");
                await guildDB.save();
                message.reply(t("cmds:autopublish.disabled"));
                break;
            case "enable":
                guildDB.plugins.autopublish = true;
                guildDB.markModified("plugins.autopublish");
                await guildDB.save();
                message.reply(t("cmds:autopublish.enabled"));
                break;
            default:
                if (!args.length) {
                    embed
                        .setTitle(
                            `${t("cmds:autopublish.current.title")} (${
                                guildDB.plugins.autopublish
                                    ? t("misc:enabled")
                                    : t("misc:disabled")
                            })`
                        )
                        .setDesc(
                            t("cmds:autopublish.current.desc", {
                                prefix: guildDB.prefix,
                            })
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

    async run({ interaction, guildDB }, t) {
        return;
    }
};
