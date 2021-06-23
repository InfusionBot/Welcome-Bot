/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    name: "kick",
    //aliases: [],
    description: "Kick a user.",
    permissions: [Permissions.FLAGS.KICK_MEMBERS],
    bot_perms: [Permissions.FLAGS.KICK_MEMBERS],
    args: true,
    guildOnly: true,
    catchError: true,
    cooldown: 5,
    usage: "[@mention] (reason)",
    category: "Moderation",
    async execute(message, args, guildDB) {
        const { userFromMention } = require("../../functions/get.js");
        if (args.length < 1) {
            return message.reply(
                "Please mention the user you want to kick and specify a kick reason (optional)."
            );
        }

        const user = userFromMention(args[0], message.client);
        if (!user) {
            return message.reply(
                "Please use a proper mention if you want to kick someone."
            );
        }
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member)
                return message.reply("That user was not found in this server");
        }
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
            channel = member.guild.channels.cache.find(
                (ch) => ch.name === guildDB.modLogChan
            );
            if (channel) {
                embed = new MessageEmbed();
                embed.setTitle(`User kicked: ${user.tag} (${user.id})`);
                embed.addField(
                    "Responsible moderator:",
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField("Reason:", reason);
                channel.send({ embeds: [embed] });
            }
        }

        return message.channel.send(
            `Successfully kicked **${user.tag}** from the server!`
        );
    },
};
