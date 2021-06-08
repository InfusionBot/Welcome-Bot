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
    usage: "(@mention)",
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        const getUserFromMention = require("../../functions/getUserFromMention.js");
        const getUserFlags = require("../../functions/getUserFlags.js");
        const user = getUserFromMention(
            args[0] || `${message.author}`,
            message.client
        );

        if (!user) {
            return;
        }

        let badges = [];
        await getUserFlags(user)
            .then((b) => {
                badges = b;
            })
            .catch((err) => {
                console.log(err);
            });

        //Covert badges to images markdown
        let badgesMD = [];
        for (i = 0; i < badges.length; i++) {
            badgesMD[badgesMD.length] = `![${badges[i].id}](${badges[i].url})`;
        }
        let msg = new MessageEmbed();
        msg.setTitle(`${user.tag}`);
        msg.setDescription(`Information about ${args[0] || message.author}`);
        msg.setThumbnail(`${user.avatarURL()}`);
        msg.addField("ID:", `\`\`\`\n${user.id}\n\`\`\``);
        let avatarURL = user.avatarURL().slice(0, 35);
        avatarURL += "...";
        msg.addField("Avatar URL:", `[${avatarURL}](${user.avatarURL()})`);
        if (badgesMD.length > 0) {
            msg.addField("Badges:", badgesMD.join(" "));
        } else {
            msg.addField("Badges:", "None");
        }
        msg.addField(
            "Joined:",
            `Joined discord at *${user.createdAt}*\n\nJoined **${message.guild.name}** server at *${message.member.joinedAt}*`
        );
        //https://discord.js.org/#/docs/main/stable/class/User?scrollTo=presence
        msg.addField("Presence:", `${user.presence.status}`);
        msg.setFooter(`Requested by ${user.tag}`, `${user.avatarURL}`);
        msg.setColor("#33ddff");
        msg.setTimestamp();
        message.channel.send(msg);
    },
};
