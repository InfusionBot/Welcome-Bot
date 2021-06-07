/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "kick",
    //aliases: [],
    description: "Kick a user.",
    permissions: ["BAN_MEMBERS"],
    args: true,
    catchError: false,
    usage: "[@mention] (reason)",
    execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 1) {
            //`args.length < 2` if reason is required
            return message.reply(
                "Please mention the user you want to kick (required) and specify a kick reason (optional)."
            );
        }

        const user = getUserFromMention(args[0]);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to kick someone."
            );
        }

        const reason = args.slice(1).join(" ");
        try {
            if (reason) user.kick(reason);
            else user.kick(reason);
        } catch (error) {
            return message.channel.send(
                `Failed to kick **${user.tag}**: ${error}`
            );
        }
    },
};
