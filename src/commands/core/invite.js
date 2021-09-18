/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageActionRow, MessageButton } = require("discord.js");
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "invite",
                aliases: ["invite-bot"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 20,
                category: "Core",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args }, t) {
        const embed = new Embed({
            color: "green",
            timestamp: true,
        })
            .setTitle(t("misc:invite"))
            .addField("\u200b", `${message.client.config.invite(this.client)}`)
            .setImage(
                "https://welcome-bot.github.io/assets/img/graphics3-standard.gif"
            );
        const button = new MessageButton()
            .setLabel(t("misc:invite"))
            .setURL(`${message.client.config.invite(this.client)}`)
            .setStyle("LINK");
        const row = new MessageActionRow().addComponents(button);
        message.reply({
            embeds: [embed],
            //ephemeral: true,
            components: [row],
        });
    }
};
