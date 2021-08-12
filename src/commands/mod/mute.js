/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "mute",
                memberPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                botPerms: [Permissions.FLAGS.MANAGE_ROLES],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Moderation",
                options: [
                    {
                        name: "user",
                        type: "USER",
                        required: true,
                    },
                    {
                        name: "reason",
                        type: "STRING",
                        required: false,
                    },
                ],
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        const user = await this.getUserFromIdOrMention(args[0]);
        if (!user) {
            return message.reply(t("errors:invalidUser"));
        }
        if (message.author.id === user.id) {
            return message.reply(t("cmds:mute.errorYourself"));
        }

        let member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.reply(
                t("cmds:mute.memberHasPerm", {
                    permission: t("permissions:MANAGE_MESSAGES"),
                })
            );
        }
        const muteRole = await this.muteRole(message, t);
        member.roles
            .add(
                muteRole,
                t("cmds:mute.reason", {
                    tag: message.author.tag,
                    reason: reason,
                })
            )
            .then((m) => {
                m.user.send(
                    t("cmds:mute.DMtext", {
                        tag: message.author.tag,
                        reason: reason,
                    })
                );
                if (guildDB.plugins.modlogs) {
                    this.handleModLogs(message, guildDB, t);
                }
                message.reply(t("cmds:mute.success", { tag: user.tag }));
            })
            .catch((e) => {
                throw e;
            });
    }

    async run({ interaction }, t) {
        const user = interaction.options.getUser("user", true);
        const reason =
            interaction.options.getUser("reason") ?? t("misc:not_spec");
        if (!user) {
            return interaction.reply(t("errors:invalidUser"));
        }
        if (interaction.user.id === user.id) {
            return interaction.reply(t("cmds:mute.errorYourself"));
        }

        let member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            member = await interaction.guild.members.fetch(user.id);
            if (!member) return interaction.reply(t("errors:userNotInGuild"));
        }
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply(
                t("cmds:mute.memberHasPerm", {
                    permission: t("permissions:MANAGE_MESSAGES"),
                })
            );
        }
        const muteRole = await this.muteRole(interaction, t);
        member.roles
            .add(
                muteRole,
                t("cmds:mute.reason", {
                    tag: interaction.user.tag,
                    reason: reason,
                })
            )
            .then((m) => {
                m.user.send(
                    t("cmds:mute.DMtext", {
                        tag: interaction.user.tag,
                        reason: reason,
                    })
                );
                if (guildDB.plugins.modlogs) {
                    this.handleModLogs(interaction, guildDB, t);
                }
                interaction.reply(t("cmds:mute.success", { tag: user.tag }));
            })
            .catch((e) => {
                throw e;
            });
    }

    async muteRole(message, t) {
        let muteRole = message.guild.roles.cache.find(
            (r) => r.name === "Muted"
        );
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#ff0000",
                    permissions: [],
                });
                message.guild.channels.fetch().then((channels) => {
                    channels.forEach(async (channel) => {
                        await channel.permissionOverwrites
                            .create(muteRole, {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                            })
                            .catch(() => {});
                    });
                });
            } catch (e) {
                throw e;
            }
        }
        if (message.guild.me.roles.highest.position >= muteRole.position)
            return message.reply(t("misc:higherRoleBot"));
        return muteRole;
    }

    handleModLogs(message, guildDB, t) {
        message.author = message.author ?? message.user;
        const channel = message.guild.channels.cache.get(
            guildDB.plugins.modlogs
        );
        const embed = new Embed({ color: "error", timestamp: true });
        if (channel) {
            embed.setTitle(`${t("cmds:mute.muted")}: ${user.tag} (${user.id})`);
            embed.addField(
                t("misc:resMod"),
                `${message.author.tag} (${message.author.id})`
            );
            embed.addField(t("misc:reason"), reason);
            channel.send({ embeds: [embed] });
        }
    }
};
