/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "config",
                aliases: ["cf", "configuration", "conf"],
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Administration",
            },
            client
        );
    }

    execute({ message, guildDB }, t) {
        const embed = new Embed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField(
                `**${t("categories:general")}**`,
                `${t("misc:prefix")}: ${guildDB.prefix}\n\n` +
                    `${t("misc:lang")}: ${
                        this.client.languages.find(
                            (l) => l.name === (guildDB.lang ?? "en-US")
                        ).aliases[0]
                    }`
            )
            .addField(
                `**${t("misc:plugins")}**`,
                `${t("dashboard:welcome")}: ${message.guild.channels.cache.get(
                    guildDB.plugins.welcome.channel
                )} (${
                    guildDB.plugins.welcome.enabled
                        ? t("misc:enabled")
                        : t("misc:disabled")
                })\n\n` +
                    `${t(
                        "dashboard:goodbye"
                    )}: ${message.guild.channels.cache.get(
                        guildDB.plugins.goodbye.channel
                    )} (${
                        guildDB.plugins.goodbye.enabled
                            ? t("misc:enabled")
                            : t("misc:disabled")
                    })\n\n` +
                    `${t("dashboard:autorole")}: ${
                        message.guild.roles.cache.get(
                            guildDB.plugins.autorole.role
                        ) ?? ""
                    } (${
                        guildDB.plugins.autorole.enabled
                            ? t("misc:enabled")
                            : t("misc:disabled")
                    })\n\n` +
                    `${t(
                        "dashboard:chatbot"
                    )}: ${message.guild.channels.cache.get(
                        guildDB.plugins.chatbot.channel
                    )} (${
                        guildDB.plugins.chatbot.enabled
                            ? t("misc:enabled")
                            : t("misc:disabled")
                    })\n\n` +
                    `${t(
                        "dashboard:serverlogs"
                    )}: ${message.guild.channels.cache.get(
                        guildDB.plugins.serverlogs.channel
                    )} (${
                        guildDB.plugins.serverlogs.enabled
                            ? t("misc:enabled")
                            : t("misc:disabled")
                    })\n\n`
            );
        message.channel.send({ embeds: [embed] });
    }
};
