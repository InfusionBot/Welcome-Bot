/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/getGuild");
module.exports = async (guild, member) => {
    let guildDB = await getGuild(guild.id);
    let channel = guild.channels.cache.find(
        (ch) => ch.name === guildDB.welcomeChannel
    );
    if (!channel) {
        return;
    }
    channel.startTyping(1);
    let msg = guildDB.welcomeMessage;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${guild.name}`)
        .replace("{members}", `${guild.memberCount}`);
    //https://discord.js.org/#/docs/collection/master/class/Collection?scrollTo=find
    channel.send(msg);
    channel.stopTyping();
};
