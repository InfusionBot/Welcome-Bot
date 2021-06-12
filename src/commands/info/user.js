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
    usage: "(@mention || user_id)",
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        //const getUserFlags = require("../../functions/getUserFlags.js");
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = getUserFromMention(
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
        let msg = new MessageEmbed();
        msg.setTitle(`${user.tag}`);
        msg.setDescription(`Information about ${args[0] || message.author}`);
        msg.setThumbnail(`${user.displayAvatarURL()}`);
        msg.addField("ID:", `\`\`\`\n${user.id}\n\`\`\``);
        let avatarURL = user.displayAvatarURL().slice(0, 35);
        avatarURL += "...";
        msg.addField(
            "Avatar URL:",
            `[${avatarURL}](${user.displayAvatarURL()})`
        );
        /*if (badgesStr.length > 0) {
            msg.addField("Badges:", badgesStr.join(" "));
        } else {
            msg.addField("Badges:", "None");
        }*/
        msg.addField(
            "Joined:",
            `Joined discord at *${user.createdAt}*\n\nJoined **${message.guild.name}** server at *${message.member.joinedAt}*`
        );
        //https://discord.js.org/#/docs/main/stable/class/User?scrollTo=presence
        msg.addField("Presence:", `${user.presence.status}`);
        msg.setFooter(
            `Requested by ${message.author.tag}`,
            `${message.author.displayAvatarURL()}`
        );
        msg.setColor("#33ddff");
        msg.setTimestamp();
        message.channel.send(msg);
    },
};
