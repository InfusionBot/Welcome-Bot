module.exports = {
    name: "message",
    aliases: [],
    description: "Manage welcome message for this server",
    args: true,
    execute(message, args) {
        const updateGuild = require("../db/functions/updateGuild");
        const getGuild = require("../db/functions/getGuild");
        switch (args[0].toLowerCase()) {
            case "set":
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            //Set welcome message
                            updateGuild(
                                message.guild.id,
                                "welcomeMessage",
                                args
                                    .join(" ")
                                    .replace(`${args[0]} `, "")
                            );
                            message.reply(
                                "Welcome message set to '" +
                                    args
                                        .join(" ")
                                        .replace(`${args[0]} `, "") +
                                    "' (without quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
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
                        guildDB = await getGuild(message.guild.id);
                        //Reset welcome channel
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            updateGuild(
                                message.guild.id,
                                "welcomeMessage",
                                "Welcome {mention} to the {server} server"
                            );
                            message.reply(
                                "Message reset to '" +
                                    guildDB.welcomeMessage +
                                    "' (without quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
                            );
                        }
                        break;
                    default:
                        message.reply(
                            "Are you trying to run a subcommand?\nI think you have a typo in the subcommand."
                        );
                        break;
                }
        }
};
