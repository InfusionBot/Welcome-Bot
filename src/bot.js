/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const WelcomeBot = require("./WelcomeBot");
const dotenv = require("dotenv").config();

const client = new WelcomeBot();

process.env.userAgent = "Discord Welcome-Bot " + client.botVersion;
process.env.ownerIDs = [
    "815204465937481749" /*PuneetGopinath#6300*/,
    "693754859014324295" /*abhijoshi2k#6842*/,
];
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
    // 15 * 60 * (1 second)
    // Update presence every 15 minutes
    setInterval(() => presence(client), 15 * 60 * 1000);
    // Update server count every 25 minutes if environment is in PRODUCTION
    if (process.env.NODE_ENV === "production")
        setInterval(() => serverCount(client), 25 * 60 * 1000);
    //Run dbAuditor every 3 hours
    setInterval(() => {
        dbAuditor(client);
    }, 3 * 60 * 60 * 1000);
    require("./functions/versionSender")(client);
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
});

client.on("guildDelete", (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
});

client.on("message", async function (message) {
    if (message.author.bot) return;
    let guildDB;
    if (message.guild && message.channel.type !== "dm") {
        guildDB = await getGuild(message.guild.id);
    } else {
        guildDB = { prefix: client.defaultPrefix };
    }

    if (message.mentions.has(client.user)) {
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
    //Whatever happens, if the message starts with prefix, the bot should execute it.
    execute(message, guildDB);
});

// Login
client.login(process.env.BOT_TOKEN);
