/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "unban",
    //aliases: [],
    description: "Unban a user.",
    permissions: ["BAN_MEMBERS"],
    args: true,
    usage: "[@mention] (reason)",
    async execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 1) {
            //`args.length < 2` if reason is required
            return message.reply(
                "Please mention the user you want to unban (required) and specify a unban reason (optional)."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to unban someone."
            );
        }

        if (args.length > 1) {
            const reason = args.slice(1).join(" ");
        }
        try {
            if (reason) await message.guild.members.unban(user, reason);
            else await message.guild.members.unban(user);
        } catch (error) {
            return message.channel.send(
                `Failed to unban **${user.tag}**: ${error}`
            );
        }

        return message.channel.send(
            `Successfully unbanned **${user.tag}** from the server!`
        );
    },
};
