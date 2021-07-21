/**
 * Discord Welcome bot
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
                name: "unmute",
                memberPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                botPerms: [Permissions.FLAGS.MANAGE_ROLES],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                usage: "[@mention / user id] (reason)",
                disabled: false,
                cooldown: 10,
                category: "Moderation",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        let user;
        let reason = args.join(" ").replace(args[0], "");
        if (!reason) {
            reason = "Not specified";
        }
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (!isNaN(parseInt(args[0]))) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        }
        if (!user) {
            return message.reply(t("errors:userNotFound"));
        }
        if (message.author.id === user.id) {
            return message.reply(t("cmds:unmute.errorYourself"));
        }

        let member;
        member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        let muteRole = message.guild.roles.cache.find(
            (r) => r.name === "Muted"
        );
        if (!muteRole || !member.roles.cache.has(muteRole.id))
            return message.reply(t("cmds:unmute.notMuted"));
        const embed = new Embed({ color: "error", timestamp: true });
        member.roles
            .remove(
                muteRole,
                t("cmds:unmute.reason", {
                    tag: message.author.tag,
                    reason: reason,
                })
            )
            .then((m) => {
                m.user.send(
                    t("cmds:unmute.DMtext", {
                        tag: message.author.tag,
                        reason: reason,
                    })
                );
                if (guildDB.modChannel) {
                    channel = message.guild.channels.cache.find(
                        (ch) => ch.name === guildDB.modChannel
                    );
                    if (channel) {
                        embed.setTitle(
                            `User unmuted: ${user.tag} (${user.id})`
                        );
                        embed.addField(
                            t("misc:resMod"),
                            `${message.author.tag} (${message.author.id})`
                        );
                        embed.addField("Reason:", reason);
                        channel.send({ embeds: [embed] });
                    }
                }
                message.reply(t("cmds:unmute.success", { tag: user.tag }));
            })
            .catch((e) => {
                throw e;
            });
    }
};
