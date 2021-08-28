/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
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
                cooldown: 10,
                category: "Administration",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        const subcommand = args[0] ? args[0].toLowerCase() : "";
        switch (subcommand) {
            case "set":
                if (args[1]) {
                    //Set bot prefix
                    updateGuild(
                        message.guild.id,
                        "prefix",
                        args.join(" ").replace(`${args[0]} `, "").trim()
                    );
                    message.reply(
                        "Custom prefix has been set to `" +
                            args.join(" ").replace(`${args[0]} `, "").trim() +
                            "`\nYou can still use the default prefix (" +
                            this.client.config.defaultPrefix +
                            ")."
                    );
                } else {
                    message.reply(
                        "Please supply valid value for setting prefix."
                    );
                }
                break;
            case "reset":
                //Reset bot prefix
                updateGuild(
                    message.guild.id,
                    "prefix",
                    this.client.config.defaultPrefix
                );

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
