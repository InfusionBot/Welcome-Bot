/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "user",
    aliases: ["whois"],
    description: "Get information about a user. It will show your info if no user was mentioned",
    args: false,
    usage: "(@mention)",
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        const user = getUserFromMention(args[0] || `${message.author}`, message.client);
        let msg = new MessageEmbed();
        msg.setTitle(`${user.tag}`);
        msg.setDescription(`Information about ${args[0]}`);
        msg.setThumbnail(`${user.defaultAvatarURL}`);
        msg.addField("ID:", `\`\`\`\n${user.id}\n\`\`\``);
        msg.addField("Avatar URL:", `[url](${user.defaultAvatarURL})`);
        msg.addField("Joined:", `Joined discord at ${user.createdAt}\n`);
        msg.addField("Presence:", `${user.presence}`)
        message.channel.send(msg);
    },
};
