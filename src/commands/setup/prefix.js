/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "prefix",
    //aliases: [],
    description: "Manage perfix for this server",
    permissions: ["MANAGE_SERVER"],
    subcommand: false,
    subcommands: ["set", "get", "reset"],
    cooldown: 10,
    guildOnly: true,
    category: "Setup",
    async execute(message, args, guildDB) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        const getGuild = require("../../db/functions/guild/getGuild");
        let subcommand = args[0] ? args[0].toLowerCase() : "";
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
                        "Prefix set to `" +
                            args.join(" ").replace(`${args[0]} `, "").trim() +
                            "`"
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
                    message.client.defaultPrefix
                );

                message.reply(
                    "Prefix reset to `" + message.client.defaultPrefix + "`"
                );
                break;
            case "get":
            default:
                //Get bot prefix
                message.reply(
                    "Prefix in this server is set to `" + guildDB.prefix + "`"
                );
                break;
        }
    },
};
