const greetUser = require("./functions/greetUser");

require("./db/connection");
const updateGuild = require("./db/functions/updateGuild");
const getGuild = require("./db/functions/getGuild");

module.exports = async (message) => {
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    switch (command) {
        case "ping":
            message.reply(`Pong!`);
            break;
        case "test":
            //Test greetUser function
            greetUser(message.guild, message.member);
            break;
        case "set":
            switch (args[0].toLowerCase()) {
                case "chan":
                    //Set welcome channel
                    updateGuild(message.guild.id, "welcomeChannel", args[1]);
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
            switch (args[0].toLowerCase()) {
                case "chan":
                case "msg":
                    //Get welcome channel
                    let guild = await getGuild(message.guild);
                    message.reply(
                        "Channel currently is set to " + guild.welcomeChannel
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
};
