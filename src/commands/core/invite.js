/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageActionRow, MessageButton } = require("discord.js");
const { Embed } = require("../../classes");
module.exports = {
    name: "invite",
    //description: "Get Invite link for the bot",
    cooldown: 20,
    category: "Core",
    execute(message, args) {
        const embed = new Embed({ color: "green", timestamp: true, footer: "Invite link for Welcome-Bot" })
            .setTitle("Invite Welcome-Bot to Your server")
            .addField(
                "\u200b",
                `Invite Welcome-Bot right now to your server: https://dsc.gg/welcome-bot`
            );
        let button = new MessageButton()
            .setLabel("Invite Welcome-Bot right now to your server")
            .setURL("https://dsc.gg/welcome-bot")
            .setStyle("LINK");
        const row = new MessageActionRow().addComponents(button);
        message.channel.send({
            embeds: [embed],
            //ephemeral: true,
            components: [row],
        });
    },
};
