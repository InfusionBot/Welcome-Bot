/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { nth } = require("../helpers/Util.js");
const { Embed } = require("../classes");
module.exports = async (member) => {
    const { client } = member;
    const guildDB = await client.db.models.Guild.findOne({ guildId: member.guild.id });
    if (
        !guildDB.plugins.goodbye.enabled ||
        guildDB.disabled.includes("goodbye")
    )
        return "disabled";
    let channel;
    if (isNaN(guildDB.plugins.goodbye.channel)) {
        channel = member.guild.channels.cache.find(
            (ch) => ch.name === guildDB.plugins.goodbye.channel
        );
    } else {
        channel = member.guild.channels.cache.find(
            (ch) => ch.id === guildDB.plugins.goodbye.channel
        );
    }
    if (!channel) {
        return "channelNotFound";
    }
    channel.sendTyping();
    let msg = guildDB.plugins.goodbye.message;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{tag}", `${member.user.tag}`)
        .replace("{username}", `${member.user.username}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`)
        .replace(
            "{members_formatted}",
            `${member.guild.memberCount}${nth(member.guild.memberCount)}`
        );
    const embed = new Embed({ color: "red" })
        .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({
                size: 512,
                dynamic: true,
                format: "png",
            })
        )
        .setTitle(`Goodbye ${member.user.tag}!`)
        .setDescription(msg)
        .setFooter(`Total members: ${member.guild.memberCount}`);
    const sent = await channel
        .send({ content: `${member.user}`, embeds: [embed] })
        .catch(() => {});
    return sent;
};
