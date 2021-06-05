/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "channel",
    aliases: ["chan"],
    description: "Manage welcome channel for this server",
    subcommand: true,
    subcommands: ["set", "get", "reset"],
    async execute(message, args) {
        const updateGuild = require("../../db/functions/updateGuild");
        const getGuild = require("../../db/functions/getGuild");
        let guildDB = await getGuild(message.guild.id);
        switch (args[0].toLowerCase()) {
            case "set":
                if (message.member.hasPermission("MANAGE_SERVER")) {
                    //Set welcome channel
                    updateGuild(
                        message.guild.id,
                        "welcomeChannel",
                        args
                            .join(" ")
                            .replace(`${args[0]} `, "")
                            .replace(" ", "")
                    ); //replace(" ", "") to replace empty space, there is no empty space in a channel name
                    message.reply(
                        "Welcome channel set to '" +
                            args
                                .join(" ")
                                .replace(`${args[0]} `, "")
                                .replace(" ", "") +
                            "' (without quotes)"
                    );
                } else {
                    message.reply(
                        "Sorry, You don't have MANAGE_SERVER permission"
                    );
                }
                break;
            case "get":
                //Get welcome channel
                message.reply(
                    "Channel currently is set to '" +
                        guildDB.welcomeChannel +
                        "' (without quotes)"
                );
                break;
            case "reset":
                //Reset welcome channel
                if (message.member.hasPermission("MANAGE_SERVER")) {
                    updateGuild(
                        message.guild.id,
                        "welcomeChannel",
                        "new-members"
                    );
                    guildDB = await getGuild(message.guild.id);
                    message.reply(
                        "Channel reset to '" +
                            guildDB.welcomeChannel +
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
