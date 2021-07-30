/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/guild/getGuild");
const { nth } = require("../helpers/Util.js");
const { Embed } = require("../classes");
module.exports = async (member) => {
    const guildDB = await getGuild(member.guild.id);
    if (
        guildDB.disabled.includes("welcome") ||
        guildDB.disabled.includes("welcome-plugin")
    )
        return;
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
        return "channelNotFound";
    }
    channel.sendTyping();
    let msg = guildDB.plugins.welcome.message;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{tag}", `${member.user.tag}`)
        .replace("{username}", `${member.user.username}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`)
        .replace("{members_formatted}", `${member.guild.memberCount}${nth(member.guild.memberCount)}`);
    const embed = new Embed({ color: "blue" })
        .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({
                size: 512,
                dynamic: true,
                format: "png",
            })
        )
        .setTitle(`Welcome ${member.user.tag}!`)
        .setDescription(msg)
        .setFooter(`Total members: ${member.guild.memberCount}`);
    channel.send({ embeds: [embed] });
};
