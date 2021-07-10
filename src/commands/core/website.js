/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageActionRow, MessageButton } = require("discord.js");
const { Embed } = require("../../classes");
module.exports = {
    name: "website",
    aliases: ["site"],
    //description: "Link to Welcome-Bot's website",
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB) {
        const embed = new Embed({ color: "green", timestamp: true, footer: "Official Website of Welcome-Bot" })
        .addField(
            "Wanna get link to Welcome-Bot's website?",
            `Here's it: ${message.client.site}`
        );
        let button = new MessageButton()
            .setLabel("Website")
            .setURL(message.client.site)
            .setStyle("LINK");
        const row = new MessageActionRow().addComponents(button);
        message.channel.send({
            embeds: [embed],
            //ephemeral: true,
            components: [row],
        });
        return;
    },
};
