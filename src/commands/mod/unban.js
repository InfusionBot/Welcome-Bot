/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    name: "unban",
    //aliases: [],
    //description: "Unban a user.",
    permissions: [Permissions.FLAGS.BAN_MEMBERS],
    bot_perms: [Permissions.FLAGS.BAN_MEMBERS],
    args: true,
    guildOnly: true,
    catchError: false,
    cooldown: 5,
    usage: "[user_id]",
    category: "Moderation",
    async execute(message, args, guildDB) {
        const id = args[0];
        if (!id || isNaN(parseInt(id))) {
            return message.reply(
                "Please use a proper user id if you want to unban someone."
            );
        }

        try {
            await message.guild.members.unban(id);
        } catch (err) {
            if (!err.toString().includes("Unknown Ban")) console.error(err);
            else
                return message.reply(
                    "Looks like that person is not banned at all in this server. Double check the person's id!"
                );
            return message.channel.send(`Failed to unban **${id}**`);
        }

        if (guildDB.modLogChan) {
            channel = message.guild.channels.cache.find(
                (ch) => ch.name === guildDB.modLogChan
            );
            if (channel) {
                embed = new MessageEmbed();
                embed.setTitle(`User unbanned: ${user.tag} (${user.id})`);
                embed.addField(
                    "Responsible moderator:",
                    `${message.author.tag} (${message.author.id})`
                );
                embed.addField("Reason:", reason);
                channel.send({ embeds: [embed] });
            }
        }

        const user = message.client.users.cache.get(id);
        return message.channel.send(
            `Successfully unbanned **${user.tag}** from the server!`
        );
    },
};
