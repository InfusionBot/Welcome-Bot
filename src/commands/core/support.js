/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "support",
                aliases: ["support-server"],
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
    async execute({ message, args }, t) {
        //TODO: Add translation
        const link = await message.client.config.supportGuildInviteReal(this.client);
        const embed = new Embed({
            color: "green",
            timestamp: true,
            footer: t("cmds:support.footer"),
        })
            .setTitle(t("cmds:support.cmdDesc"))
            .addField(
                "\u200b",
                `Join the support server`
            )
            .addField(
                "🔗 Links:",
                "> [GitHub](https://github.com/Welcome-Bot/welcome-bot/)\n" +
                    "> [Documentation](https://welcome-bot.github.io/docs)"
            );
        const button = new MessageButton()
            .setLabel("Join the support server")
            .setURL(`${link}`)
            .setStyle("LINK");
        const row = new MessageActionRow().addComponents(button);
        message.channel.send({
            embeds: [embed],
            //ephemeral: true,
            components: [row],
        });
    }
};
