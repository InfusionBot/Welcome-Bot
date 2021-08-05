/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { userFromMention } = require("../../helpers/Util.js");
const beautifyPerms = require("../../functions/beautifyPerms");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "perms",
                aliases: ["permissions"],
                memberPerms: [],
                //botPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                requirements: {
                    guildOnly: true,
                },
                usage: "(@mention / user id)",
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        //Note for contributors: If you disable this cmd, update that in botperms cmd.
        let user;
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
        } else {
            user = message.author;
        }

        if (!user) {
            return message.reply(t("errors:userNotFound"));
        }
        let member;
        member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        const embed = new Embed();
        let text = "";
        const mPermissions = message.channel.permissionsFor(member);
        const permissions = Object.keys(Permissions.FLAGS);
        let allowed = 0;
        let denied = 0;
        permissions.forEach((perm) => {
            if (!mPermissions.has(perm)) {
                text += `${beautifyPerms(
                    [Permissions.FLAGS[perm]],
                    message.client.allPerms,
                    t
                ).join("\n")} ❌\n`;
                denied++;
            } else {
                text += `${beautifyPerms(
                    [Permissions.FLAGS[perm]],
                    message.client.allPerms,
                    t
                ).join("\n")} ✅\n`;
                allowed++;
            }
        });
        text += `\n\n${allowed} ✅ | ${denied} ❌`;
        message.reply({
            embeds: [
                embed
                    .setTitle(
                        t("cmds:perms.message", {
                            tag: user.tag,
                            channel: message.channel.name,
                        })
                    )
                    .setDesc(text),
            ],
        });
    }
};
