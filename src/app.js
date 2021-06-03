/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Discord = require("discord.js");

const presence = require("./functions/presence");
const greetUser = require("./functions/greetUser");
const serverCount = require("./functions/serverCount");

if (
    !process.env.BOT_TOKEN ||
    !process.env.BOT_ID ||
    !process.env.DISCORD_BOATS_token ||
    !process.env.MONGODB_URL
) {
    const result = require("dotenv").config();
    if (result.error) {
        console.error(result.error);
    }
    //console.log(result.parsed);
}

require("./db/connection");
const updateGuild = require("./db/functions/updateGuild");
const getGuild = require("./db/functions/getGuild");
const addGuild = require("./db/functions/addGuild");
const removeGuild = require("./db/functions/removeGuild");

const client = new Discord.Client();
const prefix = "!w ";

client.on("ready", () => {
    // We logged in
    console.log(`Logged in as ${client.user.tag}!`);
    presence(client);
    // 15 * 60 * (1 second)
    // Update presence every 15 minutes
    setInterval(() => presence(client), 15 * 60 * 1000);
    // Update server count in discord.boats every 25 minutes
    setInterval(() => serverCount(client), 25 * 60 * 1000);
});

//https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=e-guildMemberAdd
client.on("guildMemberAdd", (member) => {
    // When a new member joins
    greetUser(member.guild, member);
});

//https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=e-guildCreate
client.on("guildCreate" (guild) => {
    //Bot has been invited to a new guild
    addGuild(guild.id);
});

//https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=e-guildDelete
client.on("guildDelete" (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
});

client.on("message", function (message) {
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) {
        message.channel.send(
            `Hi there, ${message.author}\nMy prefix is ${prefix.trim()}`
        );
    }
    if (message.content.startsWith(prefix)) {
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
                        getGuild(message.guild.id).welcomeChannel
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
                        getGuild(message.guild.id).welcomeMessage
                );
                break;
            default:
                message.reply(
                    "Are you trying to run a command?\nI think you have a typo in the command."
                );
                break;
        }
    }
});

// Login
client.login(process.env.BOT_TOKEN);
