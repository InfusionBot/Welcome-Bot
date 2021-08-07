/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { userFromMention } = require("../../helpers/Util.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "kick",
                memberPerms: [Permissions.FLAGS.KICK_MEMBERS],
                botPerms: [Permissions.FLAGS.KICK_MEMBERS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Moderation",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        //TODO: Add translation
        const user = userFromMention(args[0], message.client);
        if (!user) {
            return message.reply(t("errors:invalidUser"));
        }
        let member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        if (user.id === message.client.user.id)
            return message.reply(t("cmds:kick.mySelf"));

        if (
            member.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(t("misc:higherRole"));

        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        try {
            member.kick(reason);
        } catch (error) {
            console.error(error);
            return message.channel.send(`Failed to kick **${user.tag}**`);
        }

        if (guildDB.plugins.modlogs) {
            const channel = message.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (channel) {
                const embed = new Embed({ color: "red" });
                embed.setTitle(
                    `${t("cmds:lick.kicked")}: ${user.tag} (${user.id})`
                );
                embed.addField(
                    t("misc:resMod"),
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField(t("misc:reason"), reason);
                channel.send({ embeds: [embed] });
            }
        }

        return message.channel.send(
            `Successfully kicked **${user.tag}** from the server!`
        );
    }
};
