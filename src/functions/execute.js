const greetUser = require("./functions/greetUser");

require("./db/connection");
const updateGuild = require("./db/functions/updateGuild");
const getGuild = require("./db/functions/getGuild");

module.exports = (message) => {
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
            case "set-chan":
                //Set welcome channel
                updateGuild(message.guild.id, "welcomeChannel", args[0]);
                message.reply("channel set to " + args[0]);
                break;
            case "get-chan":
                //Get welcome channel
                message.reply(
                    "Channel currently is set to " +
                        await getGuild(message.guild.id).welcomeChannel
                );
                break;
            case "set-msg":
                //Set welcome message
                updateGuild(message.guild.id, "welcomeMessage", args.join(" "));
                message.reply("message set to " + args.join(" "));
                break;
            case "get-msg":
                //Get welcome message
                message.reply(
                    "Message currently is set to " +
                        await getGuild(message.guild.id).welcomeMessage
                );
                break;
            default:
                message.reply(
                    "Are you trying to run a command?\nI think you have a typo in the command."
                );
                break;
        }
};
