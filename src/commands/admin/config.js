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
                cooldown: 10,
                category: "Administration",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args, guildDB }, t) {
        const embed = new Embed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField(
                `**${t("category:general")}**`,
                `${t("misc:prefix")}: ${guildDB.prefix}`
            )
            .addField(
                `**${t("misc:plugins")}**`,
                `${t("dashboard:welcome")}: ${message.guild.channels.cache.get(
                    guildDB.plugins.welcome.channel
                )} (${
                    guildDB.plugins.welcome.enabled
                        ? t("misc:enabled")
                        : t("misc:enabled")
                })\n\n` +
                    `${t(
                        "dashboard:goodbye"
                    )}: ${message.guild.channels.cache.get(
                        guildDB.plugins.goodbye.channel
                    )} (${
                        guildDB.plugins.goodbye.enabled
                            ? t("misc:enabled")
                            : t("misc:enabled")
                    })\n\n` +
                    `${t("dashboard:autorole")}: ${
                        message.guild.roles.cache.get(
                            guildDB.plugins.autorole.role
                        ).name ?? ""
                    } (${
                        guildDB.plugins.autorole.enabled
                            ? t("misc:enabled")
                            : t("misc:enabled")
                    })\n\n`
            );
        message.channel.send({ embeds: [embed] });
    }
};
