/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/guild/getGuild");
const { MessageEmbed } = require("discord.js");
module.exports = async (member) => {
    let guildDB = await getGuild(member.guild.id);
    if (!guildDB.enableWelcome) return;
    let channel;
    if (isNaN(guildDB.channel)) {
        channel = member.guild.channels.cache.find(
            (ch) => ch.name === guildDB.channel
        );
    } else {
        channel = member.guild.channels.cache.find(
            (ch) => ch.id === guildDB.channel
        );
    }
    if (!channel) {
        return;
    }
    channel.sendTyping();
    let msg = guildDB.welcomeMessage;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`);
    let embed = new MessageEmbed()
        .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({
                size: 512,
                dynamic: true,
                format: "png",
            })
        )
        .setColor("#0099ff")
        .setTitle(`Welcome ${member.user.tag}!`)
        .setDescription(msg)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setFooter(`Total members: ${member.guild.memberCount}`);
    channel.send({ embeds: [embed] });
};
