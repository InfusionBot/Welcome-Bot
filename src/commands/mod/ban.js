/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "ban",
    //aliases: [],
    description: "Ban a user.",
    permissions: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    args: true,
    catchError: false,
    usage: "[@user] (reason)",
    async execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 1) {
            return message.reply(
                "Please mention the user you want to ban and specify a ban reason (optional)."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        const member = message.guild.members.cache.get(args[0]);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to ban someone."
            );
        }

        if (
            member.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(
                "You cannot ban someone with an equal or higher role"
            );

        const reason = args.slice(1).join(" ") || "Not specified";
        try {
            await message.guild.members.ban(user, { reason });
        } catch (error) {
            return message.channel.send(
                `Failed to ban **${user.tag}**: ${error}`
            );
        }

        return message.channel.send(
            `Successfully banned **${user.tag}** from the server!`
        );
    },
};
