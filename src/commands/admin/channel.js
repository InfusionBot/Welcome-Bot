module.exports = {
    name: "channel",
    aliases: ["chan"],
    description: "Manage welcome channel for this server",
    args: true,
    async execute(message, args) {
        const updateGuild = require("../db/functions/updateGuild");
        const getGuild = require("../db/functions/getGuild");
        let guildDB;
        switch (args[0].toLowerCase()) {
            case "set":
                        if (message.member.hasPermission("ADMINISTRATOR")) {
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
                                "Sorry, You don't have ADMINISTRATOR permission"
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
                        guildDB = await getGuild(message.guild.id);
                        //Reset welcome channel
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            updateGuild(
                                message.guild.id,
                                "welcomeChannel",
                                "new-members"
                            );
                            message.reply(
                                "Channel reset to '" +
                                    guildDB.welcomeChannel +
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
    },
};
