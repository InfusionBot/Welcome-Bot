/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const WelcomeBot = require("./WelcomeBot");
const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");

const client = new WelcomeBot();

process.env.userAgent = "Discord Welcome-Bot " + client.botVersion;
process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});
process.on("exit", (code) => {
    client.destroy();
});

const presence = require("./functions/presence");
const greetUser = require("./functions/greetUser");
const sayGoodBye = require("./functions/sayGoodBye");
const serverCount = require("./functions/serverCount");
const execute = require("./functions/execute");

require("./db/connection");
const addGuild = require("./db/functions/guild/addGuild");
const removeGuild = require("./db/functions/guild/removeGuild");
const getGuild = require("./db/functions/guild/getGuild");
const dbAuditor = require("./db/functions/dbAuditor");

client.on("ready", () => {
    // We logged in
    client.logger.log(
        `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
    );
    process.env.BOT_ID = client.user.id;
    presence(client);
    if (process.env.NODE_ENV === "production") serverCount(client);
    // 1 * 60 * (1 second)
    // Update presence every 1 minute
    setInterval(() => presence(client), 1 * 60 * 1000);
    // Update server count every 25 minutes if environment is in PRODUCTION
    if (process.env.NODE_ENV === "production")
        setInterval(() => serverCount(client), 25 * 60 * 1000);
    dbAuditor(client);
    //Run dbAuditor every 3 hours
    setInterval(() => {
        dbAuditor(client);
    }, 3 * 60 * 60 * 1000);
    require("./functions/versionSender")(client);
    if (process.env.NODE_ENV !== "production")
        require("./helpers/updateDocs")(client);
});

client.on("guildMemberAdd", (member) => {
    // When a new member joins
    greetUser(member);
});

client.on("guildMemberRemove", (member) => {
    // When a member leaves or is kicked or is banned
    sayGoodBye(member);
});

client.on("guildCreate", (guild) => {
    //Bot has been invited to a new guild
    addGuild(guild.id);
    guild.channels.cache
        .find((ch) => ch.id === guild.systemChannelID)
        .send("Thank you for choosing this bot! To get started, type `w/help`");
    let embed = new MessageEmbed()
        .setTitle(`Added to "${guild.name}"`)
        .setDescription(`${guild.id}`);
    client.channels.cache
        .get(client.loggingChannelId)
        .send({ embeds: [embed] });
});

client.on("guildDelete", (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
    let embed = new MessageEmbed()
        .setTitle(`Added to "${guild.name}"`)
        .setDescription(`${guild.id}`);
    client.channels.cache
        .get(client.loggingChannelId)
        .send({ embeds: [embed] });
});

client.on("message", async function (message) {
    if (message.author.bot) return;
    let guildDB;
    if (message.guild && message.channel.type !== "dm") {
        guildDB = await getGuild(message.guild.id);
    } else {
        guildDB = { prefix: client.defaultPrefix };
    }
    const executeResult = execute(message, guildDB);

    if (message.mentions.has(client.user) && executeResult !== true) {
        const server = message.guild ? " in this server." : "";
        let reply =
            `Hi there, ${message.author}\nI am Welcome-Bot\nMy prefix is "${guildDB.prefix}"` +
            server +
            `\nSend \`${guildDB.prefix}help\` to get help`;
        if (message.guild) {
            reply += `\nSend \`${guildDB.prefix}follow #channel\` where #channel is the channel you want to receive updates.`;
        }
        if (!message.reference) {
            message.channel.startTyping();
            message.channel.send(reply);
            message.channel.stopTyping();
        } else {
            message.channel.messages
                .fetch(message.reference.messageID)
                .then((msg) => {
                    if (msg.author.id != client.user.id) {
                        message.channel.startTyping();
                        message.channel.send(reply);
                        message.channel.stopTyping();
                    }
                })
                .catch(console.error);
        }
    }
});

// Login
client.login(process.env.BOT_TOKEN);
