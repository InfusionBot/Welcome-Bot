/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const execute = require("../functions/execute");
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
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
        if (message.channel?.partial) await message.channel.fetch();
        if (message?.partial) await message.fetch();
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

        const mentionRegex = new RegExp(
            `^(<@!?${message.client.user.id}>)\\s*`
        );
        if (!mentionRegex.test(message.content)) return;
        let reply = `Hi there, ${
            message.author
        }\nI am Welcome-Bot\nMy prefix is "${guildDB.prefix}"${
            message.guild ? " in this server." : ""
        }\nSend \`${guildDB.prefix}help\` to get help`;
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
    },
};
