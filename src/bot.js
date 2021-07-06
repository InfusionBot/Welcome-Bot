/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const WelcomeBot = require("./WelcomeBot");
const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const { Embed } = require("./classes");

const client = new WelcomeBot({
    debug: process.env.NODE_ENV === "development",
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

process.env.userAgent = "Discord Welcome-Bot " + client.botVersion;
process.on("unhandledRejection", (error) => {
    if (
        error.toString().indexOf("No guild with guild ID") !== -1 &&
        client &&
        dbAuditor
    ) {
        dbAuditor(client);
    } else {
        console.error("Unhandled promise rejection:", error);
    }
});
process.on("exit", (code) => {
    client.destroy();
});

const getT = async (guildId) => {
    const guildDB = await getGuild(guildId);
    return client.i18next.getFixedT(guildDB.lang || "en-US");
};

let embed = new Embed({ color: "success" });
client.player
    .on("trackAdd", async (queue, track) => {
        embed = new Embed({ color: "success" });
        const t = await getT(queue.metadata.guild.id);
        embed
            .setTitle(t("cmds:play.queueAdded"))
            .setDescription(track.title)
            .addField(
                "Details",
                "> " +
                    t("cmds:play.details", {
                        source: track.source,
                        link: `[${track.url.slice(0, 35)}...](${track.url})`,
                        views: `${track.views}`,
                    })
                        .split("\n")
                        .join("\n> ")
            );
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("trackStart", async (queue, track) => {
        embed = new Embed({ color: "success" });
        const t = await getT(queue.metadata.guild.id);
        embed
            .setTitle(`🥁 ${t("cmds:play.starting")}`)
            .setDescription(track.title)
            .addField(
                "Details",
                "> " +
                    t("cmds:play.details", {
                        source: track.source,
                        link: `[${track.url.slice(0, 35)}...](${track.url})`,
                        views: `${track.views}`,
                    })
                        .split("\n")
                        .join("\n> ")
            );
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("searchCancel", (queue, tracks) => {
        embed = new Embed({ color: "error" });
        embed.setTitle(t("cmds:play.timeout")).setColor("#ff0000");
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("playlistStart", async (queue, playlist, track) => {
        embed = new Embed({ color: "blue" });
        const t = await getT(queue.metadata.guild.id);
        embed.setTitle(
            t("cmds.play.playlistStart", {
                playlistTitle: playlist.title,
                songName: track.title,
            })
        );
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("playlistAdd", async (queue, playlist) => {
        embed = new Embed({ color: "blue" });
        const t = await getT(queue.metadata.guild.id);
        embed.setTitle(
            t("cmds.play.queueAddCount", {
                songCount: playlist.items.length,
            })
        );
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("searchResults", async (query, tracks) => {
        embed = new Embed({ color: "blue" });
        const t = await getT(queue.metadata.guild.id);
        if (tracks.length > 10) tracks = tracks.slice(0, 10);
        embed
            .setDescription(
                tracks.map((t, i) => `**${++i} -** ${t.title}`).join("\n")
            )
            .setFooter(t("cmds:play.results"));
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("searchInvalidResponse", async (query, tracks, content, collector) => {
        const t = await getT(queue.metadata.guild.id);
        if (content === "cancel") {
            collector.stop();
            return queue.metadata.reply(t("cmds:play.resultsCancel"));
        }
        queue.metadata.reply("errors:invalidNumRange", {
            min: 1,
            max: tracks.length,
        });
    })
    .on("debug", (queue, message) => {
        if (client.debug) client.logger.log(message, "debug", ["VOICE"]);
    })
    .on("botDisconnect", async (queue) => {
        const t = await getT(queue.metadata.guild.id);
        queue.metadata.channel.send(t("cmds:play.botDisconnected"));
    })
    .on("noResults", async (queue) => {
        const t = await getT(queue.metadata.guild.id);
        queue.metadata.channel.send(t("cmds:play.noResults"));
    })
    .on("queueEnd", async (queue) => {
        const t = await getT(queue.metadata.guild.id);
        queue.metadata.channel.send(t("cmds:play.queueEnd"));
    })
    .on("error", (queue, error) => {
        client.logger.log(
            `An error occurred, when playing queue (${queue.id}) in ${queue.guild.name} (${queue.guild.id})`,
            "error"
        );
    });

client.on("ready", async () => {
    // We logged in
    client.logger.log(
        `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
    );
    await require("./loaders/Locale.js")(client);
    client.loadCommands(__dirname + "/commands");
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
    if (client.debug)
        client.logger.log(`Welcome-Bot v${client.botVersion} started!`);
});

client.on("debug", (info) => {
    if (!info.match(/\b(?:heartbeat|token|connect)\b/gi) && client.debug)
        client.logger.log(info, "debug", ["DISCORD"]);
});

client.on("rateLimit", (info) => {
    client.logger.log("You are being rate limited!", "warn");
    client.logger.log(JSON.stringify(info, null, 4), "warn");
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
    const lang = guild.preferredLocale || "en-US";
    //Bot has been invited to a new guild
    addGuild(guild.id, lang);
    if (guild.systemChannelID) {
        guild.channels.cache
            .get(guild.systemChannelID)
            .send(
                "Thank you for choosing this bot! To get started, type `w/help`"
            );
    }
    embed = new Embed({color: "success", timestamp: true})
        .setTitle(`Added to "${guild.name}"`)
        .setDescription(`${guild.id}`);
    client.channels.cache
        .get(client.loggingChannelId)
        .send({ embeds: [embed] });
});

client.on("guildDelete", (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
    embed = new Embed({color: "error", timestamp: true})
        .setTitle(`Removed from "${guild.name}"`)
        .setDescription(`${guild.id}`);
    client.channels.cache
        .get(client.loggingChannelId)
        .send({ embeds: [embed] });
});

client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (client.debug) client.logger.log("message event triggered", "debug");
    if (!client.application?.owner) await client.application?.fetch();
    let guildDB;
    if (message.guild && message.channel.type !== "dm") {
        guildDB = await getGuild(message.guild.id);
    } else {
        guildDB = { prefix: client.defaultPrefix };
    }
    if (client.debug) client.logger.log("running execute func", "debug");
    execute(message, guildDB);
    if (client.debug)
        client.logger.log("finished running execute func", "debug");

    const mentionRegex = new RegExp(`^(<@!?${message.client.user.id}>)\\s*`);
    if (!mentionRegex.test(message.content)) return;
    let reply = `Hi there, ${message.author}\nI am Welcome-Bot\nMy prefix is "${
        guildDB.prefix
    }"${message.guild ? " in this server." : ""}\nSend \`${
        guildDB.prefix
    }help\` to get help`;
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
});

// Login
client.login(process.env.DISCORD_TOKEN);
