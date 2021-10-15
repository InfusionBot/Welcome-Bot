/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
// eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { MessageEmbed, Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "unban",
                memberPerms: [Permissions.FLAGS.BAN_MEMBERS],
                botPerms: [Permissions.FLAGS.BAN_MEMBERS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                usage: "[user id]",
                disabled: false,
                cooldown: 10,
                category: "Moderation",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        //TODO: Add translation
        const id = args[0];
        if (!id || isNaN(parseInt(id))) {
            return message.reply(t("errors:invalidUserId"));
        }
        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        const user = message.client.users.cache.get(id);

        try {
            await message.guild.members.unban(id);
        } catch (err) {
            if (!err.toString().includes("Unknown Ban")) console.error(err);
            else return message.reply(t("errors:userNotInGuild"));
            return message.channel.send(`Failed to unban **${id}**`);
        }

        if (guildDB.plugins.modlogs) {
            const channel = message.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (channel) {
                const embed = new MessageEmbed();
                embed.setTitle(`User unbanned: ${user.tag} (${user.id})`);
                embed.addField(
                    t("misc:resMod"),
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField(t("misc:reason"), reason);
                channel.send({ embeds: [embed] });
            }
        }

        return message.channel.send(
            `Successfully unbanned **${user.tag}** from the server!`
        );
    }
};
