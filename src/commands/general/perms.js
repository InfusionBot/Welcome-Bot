/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
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
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const user = await this.getUserFromIdOrMention(args[0]);
        if (!user) {
            return message.reply(t("errors:userNotFound"));
        }
        let member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member) return message.reply(t("errors:userNotInGuild"));
        }
        const embed = this.makeEmbed(message, member, t);
        message.reply({
            embeds: [
                embed.setTitle(
                    t("cmds:perms.message", {
                        tag: user.tag,
                        channel: message.channel.name,
                    })
                ),
            ],
        });
    }

    makeEmbed(message, member, t) {
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
        embed.setDesc(text);
        return embed;
    }
};
