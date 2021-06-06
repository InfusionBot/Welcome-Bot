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
    async execute(message, args) {
        const updateGuild = require("../../db/functions/updateGuild");
        const getGuild = require("../../db/functions/getGuild");
        let guildDB = await getGuild(message.guild.id);
        const subcommand = args[0].toLowerCase() || "";
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
                        "Prefix set to '" +
                            args.join(" ").replace(`${args[0]} `, "").trim() +
                            "' (without quotes)"
                    );
                } else {
                    message.reply(
                        "Please supply valid value for setting prefix."
                    );
                }
                break;
            case "reset":
                //Reset bot prefix
                updateGuild(message.guild.id, "prefix", "w/");
                guildDB = await getGuild(message.guild.id);
                message.reply(
                    "Prefix reset to '" + guildDB.prefix + "' (without quotes)"
                );
                break;
            case "get":
            default:
                //Get bot prefix
                message.reply(
                    "Prefix in this server is set to '" +
                        guildDB.prefix +
                        "' (without quotes)"
                );
                break;
        }
    },
};
