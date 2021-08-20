/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
require("dotenv").config();
const WelcomeBot = require("./WelcomeBot");
const { Embed } = require("./classes");

const client = new WelcomeBot({
    debug: process.env.NODE_ENV === "development",
});

const greetUser = require("./functions/greetUser");
const sayGoodBye = require("./functions/sayGoodBye");
const execute = require("./functions/execute");

require("./db/connection");
const addGuild = require("./db/functions/guild/addGuild");
const removeGuild = require("./db/functions/guild/removeGuild");
const getGuild = require("./db/functions/guild/getGuild");
const dbAuditor = require("./db/functions/dbAuditor");

process.env.userAgent = "Discord Welcome-Bot " + client.package.version;
process.on("unhandledRejection", (error) => {
    if (
        error.toString().indexOf("No guild with guild ID") !== -1 &&
        client &&
        dbAuditor
    ) {
        dbAuditor(client);
    } else {
        client.logger.log("Unhandled promise rejection", "error");
        console.error(error);
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
            .setTitle(`🎶 | ${t("cmds:play.queueAdded")}`)
            .setDescription(track.title)
            .setImage(track.thumbnail);
        queue.metadata.channel.send({ embeds: [embed] });
    })
    .on("trackStart", async (queue, track) => {
        embed = new Embed({ color: "success" });
        const t = await getT(queue.metadata.guild.id);
        embed
            .setTitle(`🥁 | ${t("cmds:play.starting")}`)
            .setDescription(track.title)
            .setImage(track.thumbnail);
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
    .on("channelEmpty", () => {
        // do nothing, leaveOnEmpty is not enabled
    })
    .on("connectionCreate", (queue, connection) => {
        if (client.debug)
            client.logger.log("Joined voice channel", "debug", ["VOICE"]);
    })
    .on("connectionError", (queue, err) => {
        client.logger.log("Connection Error:", "error", ["VOICE"]);
        console.log(err);
    })
    .on("error", async (queue, error) => {
        const t = await getT(queue.metadata.guild.id);
        switch (error.message.replace("Error:", "").trim()) {
            case "Status Code: 429":
                queue.metadata.reply(t("cmds:play.rateLimited"));
                break;
            case "Status Code: 403":
                queue.metadata.reply(t("cmds:play.forbidden"));
                break;
            case "Cannot use destroyed queue":
                queue.metadata.reply(t("cmds:play.destroyedQueue"));
                break;
            default:
                queue.metadata.reply(
                    t("cmds:play.errorOccurred", { error: error.message })
                );
                break;
        }
    });

client.on("ready", async () => {
    const presence = require("./functions/presence");
    const serverCount = require("./functions/serverCount");
    // We logged in
    if (client.debug)
        client.logger.log(
            `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
        );
    await require("./loaders/Locale.js")(client);
    if (client.config.dashboard.enabled) client.dashboard.load(client);
    else if (client.debug)
        client.logger.log(
            "Not loading dashboard as it is not enabled",
            "debug",
            ["DASHBOARD"]
        );
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
    client.logger.log(`Welcome-Bot v${client.package.version} started!`);
});

client.on("debug", (info) => {
    if (
        !info.match(/\b(?:heartbeat|token|connect)\b/gi) &&
        client.debug &&
        client.debugLevel > 0
    )
        client.logger.log(info, "debug", ["DISCORD"]);
});

client.on("rateLimit", (info) => {
    client.logger.log("You are being rate limited!", "warn");
    client.logger.log(JSON.stringify(info, null, 4), "warn");
});

client.on("guildMemberAdd", async (member) => {
    // When a new member joins
    greetUser(member);
    const guildDB = await getGuild(member.guild.id);
    const t = client.i18next.getFixedT(guildDB.lang || "en-US");
    const autorole = member.guild.roles.cache.get(
        guildDB.plugins.autorole.role
    );
    if (autorole && guildDB.plugins.autorole.enabled) {
        try {
            member.roles.add(autorole.id, "Autorole");
        } catch (e) {
            const modlogs = member.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (modlogs) {
                modlogs.send(
                    t("errors:errorAutorole", { tag: member.user.tag })
                );
            }
        }
    }
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
                `Thank you for choosing this bot! To get started, type \`${
                    client.config.defaultPrefix
                }help\`\nJoin the support server: ${client.config.supportGuildInviteReal(
                    client
                )}`
            )
            .catch(() => {});
    }
    embed = new Embed({ color: "success", timestamp: true })
        .setTitle(`:white_check_mark: Added to "${guild.name}"`)
        .setDescription(`${guild.id}`)
        .addField(
            "Info",
            `Shard: ${guild.shardId}\nOwner: <@${guild.ownerId}>\nMembers: ${guild.memberCount}`
        );
    client.channels.cache
        .get(client.config.logsChannelId)
        .send({ embeds: [embed] });
});

client.on("guildDelete", (guild) => {
    //Bot has been kicked or banned in a guild
    removeGuild(guild.id);
    embed = new Embed({ color: "error", timestamp: true })
        .setTitle(`:x: Removed from "${guild.name}"`)
        .setDescription(`${guild.id}`)
        .addField(
            "Info",
            `Shard: ${guild.shardId}\nOwner: <@${guild.ownerId}>\nMembers: ${guild.memberCount}`
        );
    client.channels.cache
        .get(client.config.logsChannelId)
        .send({ embeds: [embed] });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const t = interaction.inGuild()
        ? await getT(interaction.guild.id)
        : client.i18next.getFixedT("en-US");
    if (!client.application?.owner) await client.application?.fetch();
    const { commandName: cmd } = interaction;
    let guildDB;
    if (interaction.inGuild() && interaction.channel.type !== "DM") {
        guildDB = await getGuild(interaction.guild.id);
    } else {
        guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
    }
    const userDB = await client.userDbFuncs.getUser(interaction.member.user.id);
    const command = client.commands.enabled.get(cmd);
    if (!command) return;
    let preCheck = false;
    preCheck = await command.preCheck(interaction, guildDB, t);
    if (!preCheck) return;
    command.run({ interaction, guildDB, userDB }, t).catch((err) => {
        client.logger.log(`Error when executing ${command.name}`, "error", [
            "CMDS",
        ]);
        console.log(err);
        const embed = new Embed({ color: "error" })
            .setTitle(t("errors:generic"))
            .addField(
                `Please report this to ${client.ownersTags.join(" OR ")}`,
                "\u200b"
            );
        if (
            client.config.ownerIds.includes(interaction.user.id) ||
            interaction.user.id === client.application?.owner.id
        )
            embed.addField("Error", `${err}`);
        interaction.followUp({ embeds: [embed], ephemeral: true });
    });
    if (client.debug)
        client.logger.log(`Executed ${command.name} command`, "debug");
});

client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (client.debug && client.debugLevel > 0)
        client.logger.log("message event triggered", "debug");
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#optional_chaining_operator
    if (!client.application?.owner) await client.application?.fetch();
    let guildDB;
    if (message.guild && message.channel.type !== "DM") {
        guildDB = await getGuild(message.guild.id);
    } else {
        guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
    }
    if (client.debug && client.debugLevel > 0)
        client.logger.log("running execute func", "debug");
    try {
        execute(message, guildDB);
    } catch (e) {
        client.logger.log(e, "error");
    }
    if (client.debug && client.debugLevel > 0)
        client.logger.log("finished running execute func", "debug");
    if (message.content.split(" ").length > 1) return;

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
        message.channel.sendTyping();
        message.channel.send(reply);
    } else {
        message.channel.messages
            .fetch(message.reference.messageID)
            .then((msg) => {
                if (msg.author.id != client.user.id) {
                    message.channel.sendTyping();
                    message.channel.send(reply);
                }
            })
            .catch(console.error);
    }
});

// Login
client.login(process.env.DISCORD_TOKEN);
