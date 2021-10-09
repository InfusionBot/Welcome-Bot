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
                slash: true,
                options: [
                    {
                        name: "user",
                        description: "Which user to kick",
                        type: "USER",
                        required: true
                    }
                ]
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const user = userFromMention(args[0], message.client);
        if (!user) {
            return message.reply(t("errors:invalidUser"));
        }
        let member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        if (user.id === message.client.user.id)
            return message.reply(t("cmds:kick.mySelf"));

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
            member.kick(reason);
        } catch (error) {
            console.error(error);
            //TODO: add translation
            return message.channel.send(`Failed to kick **${user.tag}**`);
        }

        if (guildDB.plugins.modlogs) {
            const channel = message.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (channel) {
                const embed = new Embed({ color: "red" });
                embed.setTitle(
                    `${t("cmds:kick.kicked")}: ${user.tag} (${user.id})`
                );
                embed.addField(
                    t("misc:resMod"),
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField(t("misc:reason"), reason);
                channel.send({ embeds: [embed] });
            }
        }

        //TODO: add translation
        return message.channel.send(
            `Successfully kicked **${user.tag}** from the server!`
        );
    }

    async run({ interaction, guildDB }, t) {
        const user = interaction.options.getUser("user");
        if (!user) {
            return interaction.editReply(t("errors:invalidUser"));
        }
        const member = await interaction.guild.members.fetch(user.id);
        if (!member) return interaction.editReply(t("errors:userNotInGuild"));
        if (user.id === interaction.client.user.id)
            return interaction.editReply(t("cmds:kick.mySelf"));
        if (
            member.roles.highest.position >=
            interaction.member.roles.highest.position
        )
            return interaction.editReply(t("misc:higherRole"));

        if (
            interaction.guild.me.roles.highest.position <=
            member.roles.highest.position
        )
            return interaction.reply(t("misc:higherRoleBot"));

        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        try {
            member.kick(reason);
        } catch (error) {
            console.error(error);
            //TODO: add translation
            return interaction.reply(`Failed to kick **${user.tag}**`);
        }

        if (guildDB.plugins.modlogs) {
            const channel = message.guild.channels.cache.get(
                guildDB.plugins.modlogs
            );
            if (channel) {
                const embed = new Embed({ color: "red" });
                embed.setTitle(
                    `${t("cmds:kick.kicked")}: ${user.tag} (${user.id})`
                );
                embed.addField(
                    t("misc:resMod"),
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField(t("misc:reason"), reason);
                channel.send({ embeds: [embed] });
            }
        }

        //TODO: add translation
        return interaction.reply(
            `Successfully kicked **${user.tag}** from the server!`
        );
    }
};
