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
    usage: "[@mention] [reason]",
    execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 2) {
            return message.reply(
                "Please mention the user you want to kick and specify a kick reason."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to kick someone."
            );
        }

        const reason = args.slice(1).join(" ");
        try {
            user.kick(reason);
        } catch (error) {
            return message.channel.send(
                `Failed to kick **${user.tag}**: ${error}`
            );
        }
    },
};
