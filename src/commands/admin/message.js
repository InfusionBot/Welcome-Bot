/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "message",
    aliases: ["msg"],
    description: "Manage welcome message for this server",
    subcommand: true,
    subcommands: ["set", "get", "reset"],
    async execute(message, args) {
        const updateGuild = require("../../db/functions/updateGuild");
        const getGuild = require("../../db/functions/getGuild");
        let guildDB = await getGuild(message.guild.id);
        switch (args[0].toLowerCase()) {
            case "set":
                if (message.member.hasPermission("MANAGE_SERVER")) {
                    //Set welcome message
                    if (args[1]) {
                        updateGuild(
                            message.guild.id,
                            "welcomeMessage",
                            args.join(" ").replace(`${args[0]} `, "")
                        );
                        message.reply(
                            "Welcome message set to '" +
                                args.join(" ").replace(`${args[0]} `, "") +
                                "' (without quotes)"
                        );
                    } else {
                        message.reply(
                            "Please supply valid value for setting message."
                        );
                    }
                } else {
                    message.reply(
                        "Sorry, You don't have MANAGE_SERVER permission"
                    );
                }
                break;
            case "get":
                //Get welcome channel
                message.reply(
                    "Message currently is set to '" +
                        guildDB.welcomeMessage +
                        "' (without quotes)"
                );
                break;
            case "reset":
                //Reset welcome channel
                if (message.member.hasPermission("MANAGE_SERVER")) {
                    updateGuild(
                        message.guild.id,
                        "welcomeMessage",
                        "Welcome {mention} to the {server} server"
                    );
                    guildDB = await getGuild(message.guild.id);
                    message.reply(
                        "Message reset to '" +
                            guildDB.welcomeMessage +
                            "' (without quotes)"
                    );
                } else {
                    message.reply(
                        "Sorry, You don't have MANAGE_SERVER permission"
                    );
                }
                break;
            default:
                message.reply(
                    "Are you trying to run a subcommand?\nI think you have a typo in the subcommand."
                );
                break;
        }
    },
};
