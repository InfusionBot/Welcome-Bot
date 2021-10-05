/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const updateGuild = require("../../db/functions/guild/updateGuild");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "disable",
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    args: false,
                    guildOnly: true,
                },
                subcommands: [
                    { name: "display", desc: "Show current settings" },
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
        const embed = new Embed({ color: "red" }).setTitle(
            t("cmds:disable.title")
        );
        args[0] = args[0] ? args[0] : "";
        const { disabled } = guildDB;
        if (!args.length) {
            return message.reply({
                embeds: [embed.setDesc(`• ${disabled.join("\n• ")}`)],
            });
        } else {
            const cmd = this.client.commands.enabled.find(
                (cmd) => cmd.name === args[0].toLowerCase()
            );
            if (!cmd) {
                return message.reply(t("errors:commandNotFound"));
            }
            if (!disabled.includes(cmd.name))
                updateGuild(message.guild.id, "disabled", [
                    cmd.name,
                    ...disabled,
                ]);
            return message.reply(t("cmds:disable.done"));
        }
    }
};
