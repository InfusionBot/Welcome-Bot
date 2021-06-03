/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/getGuild");
const greetUser = async function (guild, member) {
    let channel;
    let chan;
    let msg = await getGuild(guild.id).welcomeMessage;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${guild.name}`);
    //https://discord.js.org/#/docs/collection/master/class/Collection?scrollTo=find
    chan = await getGuild(guild.id).welcomeChannel;
    channel = guild.channels.cache.find((ch) => ch.name === chan)
    channel.send(msg);
};

module.exports = greetUser;
