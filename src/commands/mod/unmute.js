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
                name: "unmute",
                memberPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                botPerms: [Permissions.FLAGS.MANAGE_ROLES],
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
        const reason = args.slice(1).join(" ") || t("misc:not_spec");
        const user = await this.getUserFromIdOrMention(args[0]);
        if (message.author.id === user.id) {
            return message.reply(t("cmds:unmute.errorYourself"));
        }

        let member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        const muteRole = message.guild.roles.cache.find(
            (r) => r.name === "Muted"
        );
        if (!muteRole || !member.roles.cache.has(muteRole.id))
            return message.reply(t("cmds:unmute.notMuted"));
        member.roles
            .remove(
                muteRole,
                t("cmds:unmute.reason", {
                    tag: message.author.tag,
                    reason: reason,
                })
            )
            .then((m) => {
                m.user
                    .send(
                        t("cmds:unmute.DMtext", {
                            tag: message.author.tag,
                            reason: reason,
                        })
                    )
                    .catch(() => {});
                if (guildDB.plugins.modlogs) {
                    this.handleModLogs(message, guildDB, user, reason, t);
                }
                message.reply(t("cmds:unmute.success", { tag: user.tag }));
            })
            .catch((e) => {
                throw e;
            });
    }

    handleModLogs(message, guildDB, user, reason, t) {
        message.author = message.author ?? message.user;
        const channel = message.guild.channels.cache.get(
            guildDB.plugins.modlogs
        );
        const embed = new Embed({ color: "success", timestamp: true });
        if (channel) {
            embed.setTitle(
                `${t("cmds:unmute.unmuted")}: ${user.tag} (${user.id})`
            );
            embed.addField(
                t("misc:resMod"),
                `${message.author.tag} (${message.author.id})`
            );
            embed.addField(t("misc:reason"), reason);
            channel.send({ embeds: [embed] });
        } else if (this.client.debug) {
            this.client.logger.log("Can't find mod channel", "debug");
        }
    }
};
