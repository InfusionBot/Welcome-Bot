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
                name: "serverinfo",
                aliases: ["si", "sinfo"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                usage: "(--dm)",
                disabled: false,
                cooldown: 5,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        args[1] = args[1] ? args[1].toLowerCase() : "";
        const embed = new Embed({ color: "green", timestamp: true })
            .setTitle(t("misc:sinfo"))
            .setDesc(`${message.guild.id}`)
            .setThumbnail(message.guild.iconURL());
        const iconURL = message.guild.iconURL().slice(0, 35) + "...";
        message.guild.members.fetch();
        embed
            .addField(
                `${this.client.customEmojis.owner} ${t("misc:owner")}`,
                `<@${message.guild.ownerId}>`
            )
            .addField("Icon URL:", `[${iconURL}](${message.guild.iconURL()})`)
            .addField(
                "Members in this server:",
                `${message.guild.members.cache.filter((m) => !m.user.bot).size}`
            )
            .addField(
                t("categories:general"),
                `> ${t("misc:channels")}: ${
                    message.guild.channels.cache.size
                }\n` +
                    `> ${t("misc:bots")}: ${
                        message.guild.members.cache.filter((m) => m.user.bot)
                            .size
                    }\n` +
                    `> ${t("misc:members")}: ${
                        message.guild.members.cache.filter((m) => !m.user.bot)
                            .size
                    }\n` +
                    `> ${t("misc:total")} ${t("misc:members")}: ${
                        message.guild.memberCount
                    }`
            )
            .addField(
                t("misc:stats"),
                `> ${t("misc:exiSince")}: ${message.guild.createdAt}\n` +
                    `> ${t("misc:lang")}: ${
                        message.guild.preferredLocale ?? "none"
                    }`
            );
        switch (args[0]) {
            case "--dm":
                message.author.send({ embeds: [embed] });
                message.channel.send(`Check out your DMs, ${message.author}`);
                break;
            default:
                message.channel.send({ embeds: [embed] });
                break;
        }
    }
};
