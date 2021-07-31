/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "membercount",
                aliases: ["mc", "members"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const embed = new Embed({ timestamp: true });
        message.guild.members.fetch();
        embed
            .setTitle(t("misc:members"))
            .setDesc(
                `> ${t("misc:bots")}: ${
                    message.guild.members.cache.filter((m) => m.user.bot).size
                }\n` +
                    `> ${t("misc:members")}: ${
                        message.guild.members.cache.filter((m) => !m.user.bot)
                            .size
                    }\n` +
                    `> ${t("misc:total")} ${t("misc:members")}: ${
                        message.guild.memberCount
                    }`
            );
        message.channel.send({ embeds: [embed] });
    }
};
