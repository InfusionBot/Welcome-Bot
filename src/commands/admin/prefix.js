/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
// eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "prefix",
                aliases: ["getprefix"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    guildOnly: true,
                },
                subcommands: [
                    { name: "set [prefix]", desc: "Set Custom prefix" },
                    { name: "reset", desc: "Reset Custom prefix" },
                ],
                disabled: false,
                cooldown: 5,
                category: "Administration",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const subcommand = args[0] ? args[0].toLowerCase() : "";
        const missingArgs = t("errors:missingArgs", {
            prefix: guildDB.prefix,
            cmd: this.name,
        });
        switch (subcommand) {
            case "set":
                if (!args[1]) return message.reply(missingArgs);
                //Set bot prefix
                guildDB.prefix = args.slice(1).join(" ").trim();
                guildDB.markModified("prefix");
                await guildDB.save();
                message.reply(
                    "Custom prefix has been set to `" +
                        args.join(" ").replace(`${args[0]} `, "").trim() +
                        "`\nYou can still use the default prefix (" +
                        this.client.config.defaultPrefix +
                        ")."
                );
                break;
            case "reset":
                //Reset bot prefix
                guildDB.prefix = this.client.config.defaultPrefix;
                guildDB.markModified("prefix");
                await guildDB.save();

                message.reply(
                    "Prefix reset to `" + this.client.config.defaultPrefix + "`"
                );
                break;
            case "get":
            default:
                //Get bot prefix
                message.reply(
                    "Custom Prefix in this server is currently set to `" +
                        guildDB.prefix +
                        "`"
                );
                break;
        }
    }
};
