const greetUser = require("./greetUser");

require("../db/connection");
const updateGuild = require("../db/functions/updateGuild");
const getGuild = require("../db/functions/getGuild");

module.exports = async (message) => {
    let guildDB = await getGuild(message.guild.id);
    if (message.content.startsWith(guildDB.prefix)) {
        const commandBody = message.content.slice(guildDB.prefix.length);
        const args = commandBody.split(" ");
        args.shift();

        switch (args[0].toLowerCase()) {
            case "ping":
                message.reply("Pong!");
                break;
            case "test":
                //Test greetUser function
                if (message.member.hasPermission("ADMINISTRATOR")) {
                    greetUser(message.guild, message.member);
                }
                break;
            case "prefix":
                switch (args[1].toLowerCase()) {
                    case "set":
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            //Set bot prefix
                            updateGuild(
                                message.guild.id,
                                "prefix",
                                args
                                    .join(" ")
                                    .replace(`${args[0]} ${args[1]} `, "")
                                    .replace(" ", "")
                            ); //replace(" ", "") to replace empty space, there is no empty space in a prefix
                            message.reply(
                                "Prefix set to '" +
                                    args
                                        .join(" ")
                                        .replace(`${args[0]} ${args[1]} `, "")
                                        .replace(" ", "") +
                                    "' (no quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
                            );
                        }
                        break;
                    case "get":
                        //Get bot prefix
                        message.reply(
                            "Prefix in this server is set to '" +
                                guildDB.prefix +
                                "' (no quotes)"
                        );
                        break;
                    case "reset":
                        //Reset bot prefix
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            updateGuild(message.guild.id, "prefix", "!w");
                            message.reply(
                                "Prefix reset to '" +
                                    guildDB.prefix +
                                    "' (no quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
                            );
                        }
                        break;
                }
                break;
            case "chan":
                switch (args[1].toLowerCase()) {
                    case "set":
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            //Set welcome channel
                            updateGuild(
                                message.guild.id,
                                "welcomeChannel",
                                args
                                    .join(" ")
                                    .replace(`${args[0]} ${args[1]} `, "")
                                    .replace(" ", "")
                            ); //replace(" ", "") to replace empty space, there is no empty space in a channel name
                            message.reply(
                                "Welcome channel set to '" +
                                    args
                                        .join(" ")
                                        .replace(`${args[0]} ${args[1]} `, "")
                                        .replace(" ", "") +
                                    "' (no quotes)"
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
                                "' (no quotes)"
                        );
                        break;
                    case "reset":
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
                                    "' (no quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
                            );
                        }
                        break;
                }
                break;
            case "message":
                switch (args[1].toLowerCase()) {
                    case "set":
                        if (message.member.hasPermission("ADMINISTRATOR")) {
                            //Set welcome message
                            updateGuild(
                                message.guild.id,
                                "welcomeMessage",
                                args
                                    .join(" ")
                                    .replace(`${args[0]} ${args[1]} `, "")
                            );
                            message.reply(
                                "Welcome message set to " +
                                    args
                                        .join(" ")
                                        .replace(`${args[0]} ${args[1]} `, "")
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
                                "' (no quotes)"
                        );
                        break;
                    case "reset":
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
                                    "' (no quotes)"
                            );
                        } else {
                            message.reply(
                                "Sorry, You don't have ADMINISTRATOR permission"
                            );
                        }
                        break;
                }
                break;
            default:
                message.reply(
                    "Are you trying to run a command?\nI think you have a typo in the command."
                );
                break;
        }
    }
};
