/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "stats",
    aliases: ["server"],
    description: "Your server statistics",
    usage: "(--dm)",
    cooldown: 10,
    guildOnly: true,
    category: "Information",
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        let embed = new MessageEmbed();
        embed.setTitle("Statistics");
        embed.setDescription(`Statistics for ${message.guild.name} server`);
        //https://discord.js.org/#/docs/main/v12/class/Guild?scrollTo=iconURL
        embed.setThumbnail(message.guild.iconURL());
        embed.addField(
            "Members in this server:",
            `${message.guild.members.cache.filter((m) => !m.user.bot).size}`
        );
        embed.addField(
            "Bots in this server:",
            `${message.guild.members.cache.filter((m) => m.user.bot).size}`
        );
        embed.addField("Total users and bots", `${message.guild.memberCount}`);
        embed.addField(
            "Online users in your server:",
            `${
                message.guild.members.cache.filter(
                    (m) => m.presence.status === "online"
                ).size
            }`
        );
        embed.addField("Server was created at:", `${message.guild.createdAt}`);
        embed.addField("Server region:", `${message.guild.region}`);
        embed.addField(
            "Maximum amount of members allowed in this server",
            `${message.guild.maximumMembers}`
        );
        switch (args[0]) {
            case "--dm":
                message.author.send({ embeds: [embed] });
                message.channel.send(`Check out your DMs ${message.author}`);
                break;
            default:
                message.channel.send({ embeds: [embed] });
                break;
        }
    },
};
