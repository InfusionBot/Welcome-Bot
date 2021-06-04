const greetUser = require("../functions/greetUser");

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
                message.reply(`Pong!`);
                break;
            case "test":
                //Test greetUser function
                if (message.member.hasPermission("ADMINISTRATOR")) {
                    greetUser(message.guild, message.member);
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
                            );
                            message.reply(
                                "Welcome channel set to " +
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
                            "Channel currently is set to '" +
                                guildDB.welcomeChannel +
                                "'"
                        );
                        break;
                    case "reset":
                        //Reset welcome channel
                        updateGuild(
                            message.guild.id,
                            "welcomeChannel",
                            "new-members"
                        );
                        message.reply(
                            "Channel reset to '" + guildDB.welcomeChannel + "'"
                        );
                        break;
                }
                break;
            case "set":
                if (message.member.hasPermission("ADMINISTRATOR")) {
                    switch (args[1].toLowerCase()) {
                        case "msg":
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
                            break;
                    }
                }
                break;
            case "get":
                switch (args[1].toLowerCase()) {
                    case "msg":
                        //Get welcome message
                        message.reply(
                            "Message currently is set to '" +
                                guildDB.welcomeMessage +
                                "'"
                        );
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
