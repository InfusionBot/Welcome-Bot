/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "perms",
    aliases: ["permissions"],
    description:
        "Get permissions given to a specific user. Not providing any mention will show your permissions",
    args: false,
    guildOnly: true,
    usage: "(@mention / user_id)",
    cooldown: 5,
    category: "General",
    async execute(message, args, guildDB) {
        const { Permissions } = require("discord.js");
        const { userFromMention } = require("../../functions/get.js");
        const beautifyPerms = require("../../functions/beautifyPerms");
        let user;
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
        } else {
            user = message.author;
        }

        if (!user) {
            message.reply("An error occurred when trying to find the user");
            return false;
        }
        let member;
        member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member)
                return message.reply("That user was not found in this server");
        }
        let text =
            `Permissions for **${user.tag}** in *${message.channel.name}* channel` +
            "\n```\n\n";
        const mPermissions = message.channel.permissionsFor(member);
        const permissions = Object.keys(Permissions.FLAGS);
        let allowed = 0;
        let denied = 0;
        permissions.forEach((perm) => {
            if (!mPermissions.has(perm)) {
                text += `${beautifyPerms(
                    [Permissions.FLAGS[perm]],
                    message.client.allPerms
                ).join("\n")} ❌\n`;
                denied++;
            } else {
                text += `${beautifyPerms(
                    [Permissions.FLAGS[perm]],
                    message.client.allPerms
                ).join("\n")} ✅\n`;
                allowed++;
            }
        });
        text += "\n" + `${allowed} ✅ | ${denied} ❌` + "```";
        message.reply(text);
    },
};
