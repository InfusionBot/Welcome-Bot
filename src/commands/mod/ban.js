/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "ban",
    //aliases: [],
    description: "Ban a user.",
    permissions: ["MANAGE_SERVER"],
    args: true,
    usage: "[@mention] [reason]",
    execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 2) {
            return message.reply(
                "Please mention the user you want to ban and specify a ban reason."
            );
        }

        const user = getUserFromMention(args[0]);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to ban someone."
            );
        }

        const reason = args.slice(1).join(" ");
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
