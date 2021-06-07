/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "kick",
    //aliases: [],
    description: "Kick a user.",
    permissions: ["KICK_MEMBERS"],
    bot_perms: ["KICK_MEMBERS"],
    args: true,
    catchError: false,
    usage: "[@mention] (reason)",
    execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 1) {
            return message.reply(
                "Please mention the user you want to kick and specify a kick reason (optional)."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        const member = message.guild.members.cache.get(user.id);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to kick someone."
            );
        }

        if (member.roles.highest.position >= message.member.roles.highest.position)
            return message.channel.send('You cannot kick someone with an equal or higher role');

        const reason = args.slice(1).join(" ") || "Not specified";
        try {
            user.kick(reason);
        } catch (error) {
            return message.channel.send(
                `Failed to kick **${user.tag}**: ${error}`
            );
        }
    },
};
