/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/guild/getGuild");
//const genImage = require("./genImage");
//const fs = require("fs");
module.exports = async (member) => {
    const { MessageEmbed } = require("discord.js");
    let guildDB = await getGuild(member.guild.id);
    let channel = member.guild.channels.cache.find(
        (ch) => ch.name === guildDB.channel
    );
    if (!channel) {
        return;
    }
    channel.startTyping(1);
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
    channel.stopTyping();
};
