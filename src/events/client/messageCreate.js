/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
const { MessageActionRow, MessageButton } = require("discord.js");
const formatChat = require("../../functions/formatChat");
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const execute = require("../../functions/execute");
        if (!client.initialized) return;
        let guildDB;
        try {
            if (message.guild && message.channel.type !== "DM") {
                guildDB = await client.models.Guild.findOne({
                    guildId: message.guild.id,
                });
                if (!guildDB) {
                    guildDB = await client.db.findOrCreateGuild(
                        message.guild.id
                    );
                }
            } else {
                guildDB = {
                    prefix: client.config.defaultPrefix,
                    disabled: [],
                    plugins: {},
                    premium: { enabled: false },
                    lang: "en-US",
                };
            }
            // eslint-disable-next-line no-empty
        } catch (e) {}
        if (!guildDB) return;
        //const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (
            message.channel?.type === "GUILD_NEWS" &&
            guildDB.plugins?.autopublish &&
            message.crosspostable
        )
            message.crosspost();
        if (message.author.bot) return;
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#optional_chaining_operator
        if (!client.application?.owner) await client.application?.fetch();
        if (message.channel?.partial) await message.channel.fetch();
        if (message?.partial) await message.fetch();
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (
            message.guild &&
            guildDB.plugins.gtn.channel === message.channel.id &&
            guildDB.plugins.gtn.ongoing
        ) {
            const number = Number(message.cleanContent);
            if (number === guildDB.plugins.gtn.number) {
                message.react("✅");
                message.channel.send(
                    t("cmds:gtn.winner", { user: `${message.author}` })
                );
                client.commands.enabled
                    .get("lock")
                    .execute({ message, noReply: true });
                guildDB.plugins.gtn.ongoing = false;
                guildDB.plugins.gtn.number = 0;
                await guildDB.save();
            } else {
                message.react("❌");
            }
            return;
        }
        if (client.debug && client.debugLevel > 0)
            client.logger.log("running execute func", "debug");
        let result;
        try {
            result = await execute(message, guildDB, t);
        } catch (e) {
            client.logger.log(e, "error");
        }
        if (client.debug && client.debugLevel > 0)
            client.logger.log("finished running execute func", "debug");
        if (
            !result &&
            message.guild &&
            guildDB.plugins.chatbot.enabled &&
            (message.channel.id === guildDB.plugins.chatbot.channel ||
                message.mentions.users.has(client.user.id)) &&
            process.env.CHATBOT_API
        ) {
            if (client.debug) client.logger.debug("Chatbot");
            const content = message.cleanContent
                .replace(/@(everyone)/gi, "everyone")
                .replace(/@(here)/gi, "here");
            const chatBotUrl = `http://api.brainshop.ai/get?bid=159117&key=${
                process.env.CHATBOT_API
            }&uid=${encodeURIComponent(
                message.author.id
            )}&msg=${encodeURIComponent(content)}`;
            let chat;
            try {
                chat = await require("axios")
                    .get(chatBotUrl)
                    .then((res) => res.data);
            } catch (e) {
                return message.reply("Error: Unknown error");
            }
            message.reply(
                `${
                    chat?.cnt
                        ? formatChat(client, chat.cnt)
                        : "Error: No message provided"
                }`
            );
        }
        const mentionRegex = new RegExp(
            `^(<@!?${message.client.user.id}>)\\s*`
        );
        if (message.content.split(" ").length > 1) return;

        if (!mentionRegex.test(message.content)) return;
        let reply = `Hi there, ${message.author}\nI am ${
            client.user.username
        }\nMy prefix is "${guildDB.prefix}"${
            message.guild ? " in this server." : ""
        }\nSend \`${guildDB.prefix}help\` to get help`;
        if (message.guild) {
            reply += `\nSend \`${guildDB.prefix}follow #channel\` where #channel is the channel you want to receive updates.`;
        }
        const embed = new Embed()
            .setTitle(client.user.tag)
            .setDescription(reply);
        const row = new MessageActionRow();
        const buttons = [
            new MessageButton()
                .setLabel("Support")
                .setStyle("LINK")
                .setURL(client.config.supportGuildInvite), //support server
            new MessageButton()
                .setLabel("Invite me")
                .setStyle("LINK")
                .setURL(client.config.invite(client)), //invite the bot
        ];
        row.addComponents(...buttons);
        if (!message.reference) {
            message.channel.sendTyping().catch(() => {});
            message.channel.send({ embeds: [embed], components: [row] });
        } else {
            message.channel.messages
                .fetch(message.reference.messageId)
                .then((msg) => {
                    if (msg.author.id !== client.user.id) {
                        message.channel.sendTyping();
                        message.channel.send(reply);
                    }
                })
                .catch(console.error);
        }
    },
};
