/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/getGuild");
const genImage = require("./genImage");
module.exports = async (member) => {
    let guildDB = await getGuild(member.guild.id);
    let channel = member.guild.channels.cache.find(
        (ch) => ch.name === member.guildDB.channel
    );
    let image;
    if (!channel) {
        return;
    }
    channel.startTyping(1);
    let msg = member.guildDB.welcomeMessage;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`);
    image = genImage(member);
    channel.send(msg);
    channel.stopTyping();
};
