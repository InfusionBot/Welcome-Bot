/**
 * Discord Welcome bot
 * Copyright (c) 2021 The BaalKrshna Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Discord = require("discord.js");

const presence = require("./functions/presence");
const greetUser = require("./functions/greetUser");

if (!process.env.BOT_TOKEN) {
    const result = require("dotenv").config();
    if (result.error) {
        console.error(result.error);
    }
    //console.log(result.parsed);
}

const client = new Discord.Client();
const prefix = "!w ";

client.on("ready", () => {
    // We logged in
    console.log(`Logged in as ${client.user.tag}!`);
    presence(client);
    // 15 * 60 * (1 second)
    // Update presence every 15 minutes
    setInterval(() => presence(client), 15 * 60 * 1000);
});

client.on("guildMemberAdd", (member) => {
    // When a new member joins
    greetUser(member.guild, member);
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
        }
    }
});

// Login
client.login(process.env.BOT_TOKEN);
