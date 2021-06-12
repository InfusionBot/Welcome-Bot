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
    guildOnly: true,
    catchError: true,
    cooldown: 5,
    usage: "[@mention] (reason)",
    execute(message, args, guildDB) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        if (args.length < 1) {
            return message.reply(
                "Please mention the user you want to kick and specify a kick reason (optional)."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to kick someone."
            );
        }
        const member = message.guild.members.cache.get(user.id);
        if (!member)
            return message.reply(
                "We can't find that user in your server as a member."
            );
        if (user.id === message.client.user.id)
            return message.reply(
                "Please don't try to kick me, you have to do it yourself."
            );

        if (
            member.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(
                "You cannot kick someone with an equal or higher role!"
            );

        const reason = args.slice(1).join(" ") || "Not specified";
        try {
            member.kick(reason);
        } catch (error) {
            console.error(error);
            return message.channel.send(`Failed to kick **${user.tag}**`);
        }

        if (guildDB.modLogChan) {
            channel = member.guild.channels.find(
                (ch) => ch.name === guildDB.modLogChan
            );
            if (channel) {
                msg = new MessageEmbed();
                msg.setTitle(`User kicked: ${user.tag} (${user.id})`);
                msg.addField(
                    "Responsible moderator:",
                    `${message.author.tag} (${message.author.id})`
                );
                msg.addField("Reason:", reason);
                channel.send(msg);
            }
        }

        return message.channel.send(
            `Successfully kicked **${user.tag}** from the server!`
        );
    },
};
