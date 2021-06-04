/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const Discord = require("discord.js");
const dotenv = require("dotenv").config();

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const presence = require("./functions/presence");
const greetUser = require("./functions/greetUser");
const serverCount = require("./functions/serverCount");
const execute = require("./functions/execute");

require("./db/connection");
const addGuild = require("./db/functions/addGuild");
const removeGuild = require("./db/functions/removeGuild");
const getGuild = require("./db/functions/getGuild");

const client = new Discord.Client();
//const prefix = "!w ";

client.on("ready", () => {
    // We logged in
    console.log(`Logged in as ${client.user.tag}!`);
    process.env.BOT_ID = client.user.id;
    presence(client);
    serverCount(client);
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
client.on("guildCreate", (guild) => {
    //Bot has been invited to a new guild
    addGuild(guild.id);
});

//https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=e-guildDelete
client.on("guildDelete", (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
});

client.on("message", async function (message) {
    if (message.author.bot) return;
    const guildDB = await getGuild(message.guild.id);
    if (message.mentions.has(client.user)) {
        message.channel.send(
            `Hi there, ${message.author}\nMy prefix is ${guildDB.prefix.trim()}`
        );
    }
    execute(message);
});

// Login
client.login(process.env.BOT_TOKEN);
