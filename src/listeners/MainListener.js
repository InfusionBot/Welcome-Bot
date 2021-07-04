/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const execute = require("../functions/execute");
module.exports = class MainListener {
    constructor(client) {
        this.events = ["message"];
        this.client = client;
        this.name = "Main";
    }

    async onMessage(message) {
        const client = this.client;
        if (message.author.bot) return;
    if (client.debug) client.logger.log("message event triggered", "debug");
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
    }
};
