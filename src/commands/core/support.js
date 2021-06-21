/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "support",
    aliases: ["supportserver", "supportguild"],
    description: "Link to Support Server of Welcome-Bot",
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        let ownersMentions = "";
        for (var i = 0; i < message.client.ownerIDs.length; i++) {
            ownersMentions += `<@${message.client.ownerIDs[i]}> `;
        }
        ownersMentions = ownersMentions.trim();
        let embed = new MessageEmbed()
        .setTitle("Support Server for Welcome-Bot")
        .addField("Bot owners:", ownersMentions)
        .addField("Bot owners IDs:", message.client.ownerIDs.join(", "))
        .addField("\u200b", `Link: https://dsc.gg/welcome-bot-guild`);
        message.channel.send({embeds: [embed]});
    },
};
