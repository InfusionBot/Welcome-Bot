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
        const command = args[0].toLowerCase();
        switch (command) {
            case "ping":
                message.reply(`Pong!`);
                break;
            case "test":
                //Test greetUser function
                greetUser(message.guild, message.member);
                break;
            case "set":
                switch (args[1].toLowerCase()) {
                    case "chan":
                        //Set welcome channel
                        updateGuild(
                            message.guild.id,
                            "welcomeChannel",
                            args[1]
                        );
                        message.reply("channel set to " + args[1]);
                        break;
                    case "msg":
                        //Set welcome message
                        updateGuild(
                            message.guild.id,
                            "welcomeMessage",
                            args.join(" ").replace(args[0] + " ", "")
                        );
                        message.reply(
                            "message set to " +
                                args.join(" ").replace(args[0] + " ", "")
                        );
                        break;
                }
                break;
            case "get":
                switch (args[1].toLowerCase()) {
                    case "chan":
                        //Get welcome channel
                        message.reply(
                            "Channel currently is set to " +
                                guildDB.welcomeChannel
                        );
                    case "msg":
                        //Get welcome message
                        message.reply(
                            "Message currently is set to '" +
                                guildDB.welcomeMessage + "'"
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
