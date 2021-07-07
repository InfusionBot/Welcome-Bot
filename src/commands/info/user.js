/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { userFromMention } = require("../../functions/get.js");
const { Embed } = require("../../classes");
module.exports = {
    name: "user",
    aliases: ["whois"],
    //description:
    //"Get information about a user. It will show your info if no user was mentioned",
    args: false,
    usage: "(@mention / user_id)",
    category: "Information",
    async execute(message, args, guildDB, t) {
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (
                !isNaN(parseInt(args[0])) &&
                args[0] !== message.client.user.id
            ) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        } else {
            user = message.author;
        }

        if (!user) {
            message.reply(t("errors:userNotFound"));
            return false;
        }
        let member;
        if (!member) {
            member = await message.guild.members.fetch(user.id);
            if (!member)
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
        let embed = new Embed({
            tag: message.author.tag,
            avatarURL: message.author.displayAvatarURL(),
            color: "success",
            timestamp: true,
        });
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
            `Joined discord at *${user.createdAt}*` +
                (message.guild
                    ? `\n\nJoined **${message.guild.name}** server at *${message.member.joinedAt}*`
                    : "")
        );
        if (member && member.nickname)
            embed.addField("Nickname:", `${member.nickname}`);
        //https://discord.js.org/#/docs/main/stable/class/User?scrollTo=presence
        embed.addField("Presence:", `${member.presence.status}`);
        message.channel.send({ embeds: [embed] });
    },
};
