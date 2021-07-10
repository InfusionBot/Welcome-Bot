/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
const { Permissions } = require("discord.js");
const { userFromMention } = require("../../functions/get.js");
module.exports = {
    name: "mute",
    //description: "Mute a member",
    permissions: [Permissions.FLAGS.MANAGE_MESSAGES],
    bot_perms: [Permissions.FLAGS.MANAGE_ROLES],
    args: true,
    guildOnly: true,
    usage: "[@mention / user_id] (reason)",
    cooldown: 10,
    category: "Moderation",
    async execute(message, args, guildDB, t) {
        let user;
        let reason = args[1];
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
            if (
                !isNaN(parseInt(args[0])) &&
                args[0] !== message.client.user.id
            ) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        }
        if (!user) {
            return message.reply(t("errors:userNotFound"));
        }
        if (message.author.id === user.id) {
            return message.reply(t("cmds:mute.errorYourself"));
        }

        let member;
        member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member)
                return message.reply(t("errors:userNotInGuild"));
        }
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.reply(t("cmds:mute.memberHasPerm"));
        }
        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#ff0000",
                    permissions: [],
                });
                message.guild.channels.fetch()
                    .then(channels => {
                        channels.forEach(async (channel, id) => {
                        await channel.permissionOverwrites.create(muteRole, {
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                        });
                    });
                    });
            } catch (e) {
                throw e;
            }
        }
        const embed = new Embed({ color: "error", timestamp: true });
        member.roles.add(muteRole, t("cmds:mute.reason", {tag:message.author.tag, reason: reason}))
            .then(m => {
                m.user.send(t("cmds:mute.DMtext", {tag: message.author.tag, reason: reason}));
                if (guildDB.modChannel) {
                    channel = message.guild.channels.cache.find(
                        (ch) => ch.name === guildDB.modChannel
                    );
                    if (channel) {
                        embed.setTitle(`User muted: ${user.tag} (${user.id})`);
                        embed.addField(
                            t("misc:resMod"),
                            `${message.author.tag} (${message.author.id})`
                        );
                        embed.addField("Reason:", reason);
                        channel.send({ embeds: [embed] });
                    }
                }
                message.reply(t("cmds:mute.success", {tag:user.tag}));
            })
            .catch(e => {
                throw e;
            });
    },
};
