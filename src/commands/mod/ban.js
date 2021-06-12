/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    //aliases: [],
    description: "Ban a user.",
    permissions: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    args: true,
    guildOnly: true,
    catchError: false,
    cooldown: 5,
    usage: "[@user] (reason)",
    async execute(message, args, guildDB) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        let channel;
        if (args.length < 1) {
            return message.reply(
                "Please mention the user you want to ban and specify a ban reason (optional)."
            );
        }

        const user = getUserFromMention(args[0], message.client);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to ban someone."
            );
        }
        const member = message.guild.members.cache.get(user.id);
        if (user.id === message.client.user.id)
            return message.reply(
                "Please don't try to ban me, you have to do it yourself."
            );

        if (
            member.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(
                "You cannot ban someone with an equal or higher role!"
            );

        const reason = args.slice(1).join(" ") || "Not specified";
        try {
            await message.guild.members.ban(user, { reason });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Failed to ban **${user.tag}**`);
        }

        if (guildDB.modLogChan && channel = members.guild.channels.find(ch => ch.name === guildDB.modLogChan)) {
            msg = new MessageEmbed();
            msg.setTitle(`User banned: ${user.tag} (${user.id})`);
            msg.addField("Responsible moderator:", `${message.author.tag} (${message.author.id})`);
            msg.addField("Reason:", reason)
            channel.send(msg);
        }

        return message.channel.send(
            `Successfully banned **${user.tag}** from the server!`
        );
    },
};
