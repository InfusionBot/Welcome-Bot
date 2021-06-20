/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "user",
    aliases: ["whois"],
    description:
        "Get information about a user. It will show your info if no user was mentioned",
    args: false,
    usage: "(@mention / user_id)",
    category: "Information",
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const { userFromMention } = require("../../functions/get.js");
        //const getUserFlags = require("../../functions/getUserFlags.js");
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (
                typeof args[0] === "number" &&
                args[0] !== message.client.user.id
            )
                user = message.client.users.cache.get(args[0]);
        } else {
            user = message.author;
        }

        if (!user) {
            return false;
        }
        let member = message.guild.members.cache.find((m) => m.id === user.id);
        if (!member && message.guild) {
            return message.reply("That user was not found in this server");
        }

        /*let badges = [];
        await getUserFlags(user)
            .then((b) => {
                badges = b;
            })
            .catch((err) => {
                console.log(err);
            });

        //Covert badges to images markdown
        let badgesStr = [];
        for (var i = 0; i < badges.length; i++) {
            badgesStr[badgesStr.length] = `${message.client.emojis.cache.find(
                (emoji) => emoji.id === badges[i].emoji
            )}`;
        }*/
        let embed = new MessageEmbed();
        embed.setTitle(`${user.tag}`);
        embed.setDescription(`Information about ${args[0] || message.author}`);
        embed.setThumbnail(`${user.displayAvatarURL()}`);
        embed.addField("ID:", `\`\`\`\n${user.id}\n\`\`\``);
        let avatarURL = user.displayAvatarURL().slice(0, 35);
        avatarURL += "...";
        embed.addField(
            "Avatar URL:",
            `[${avatarURL}](${user.displayAvatarURL()})`
        );
        /*if (badgesStr.length > 0) {
            embed.addField("Badges:", badgesStr.join(" "));
        } else {
            embed.addField("Badges:", "None");
        }*/
        embed.addField(
            "Joined:",
            `Joined discord at *${user.createdAt}*` + message.guild ? `\n\nJoined **${message.guild.name}** server at *${message.member.joinedAt}*` : ""
        );
        embed.addField("Locale:", `${user.locale}`);
        if (member && member.nickname) embed.addField("Nickname:", `${member.Nickname}`);
        //https://discord.js.org/#/docs/main/stable/class/User?scrollTo=presence
        embed.addField("Presence:", `${user.presence.status}`);
        embed.setFooter(
            `Requested by ${message.author.tag}`,
            `${message.author.displayAvatarURL()}`
        );
        embed.setColor("#33ddff");
        embed.setTimestamp();
        message.channel.send({ embeds: [embed] });
    },
};
