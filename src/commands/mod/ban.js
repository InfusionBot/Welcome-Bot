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
                name: "ban",
                memberPerms: [Permissions.FLAGS.BAN_MEMBERS],
                botPerms: [Permissions.FLAGS.BAN_MEMBERS],
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
            return message.reply(t("cmds:ban.mySelf"));

        if (
            member.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(t("misc:higherRole"));

        if (
            message.guild.me.roles.highest.position <=
            member.roles.highest.position
        )
            return message.reply(t("misc:higherRoleBot"));

        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        try {
            await message.guild.members.ban(user, { reason });
        } catch (err) {
            console.error(err);
            return message.channel.send(`Failed to ban **${user.tag}**`);
        }

        if (guildDB.plugins.modlogs) {
            const channel = message.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (channel) {
                const embed = new Embed({ color: "red" });
                embed.setTitle(
                    `${t("cmds:ban.banned")}: ${user.tag} (${user.id})`
                );
                embed.addField(
                    t("misc:resMod"),
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField(t("misc:reason"), reason);
                channel.send({ embeds: [embed] });
            }
        }

        message.reply(t("cmds:ban.success", { tag: user.tag }));
    }
};
