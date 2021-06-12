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
    bot_perms: ["BAN_MEMBERS"],
    args: true,
    guildOnly: true,
    catchError: false,
    cooldown: 5,
    usage: "[user_id]",
    async execute(message, args, guildDB) {
        const id = args[0];
        if (!id) {
            return message.reply(
                "Please use a proper user id if you want to unban someone."
            );
        }

        try {
            await message.guild.members.unban(id);
        } catch (error) {
            return message.channel.send(`Failed to unban **${id}**: ${error}`);
        }

        if (guildDB.modLogChan) {
            channel = members.guild.channels.find(
                (ch) => ch.name === guildDB.modLogChan
            );
            if (channel) {
                msg = new MessageEmbed();
                msg.setTitle(`User unbanned: ${user.tag} (${user.id})`);
                msg.addField(
                    "Responsible moderator:",
                    `${message.author.tag} (${message.author.id})`
                );
                msg.addField("Reason:", reason);
                channel.send(msg);
            }
        }

        const user = message.client.users.cache.get(id);
        return message.channel.send(
            `Successfully unbanned **${user.tag}** from the server!`
        );
    },
};
