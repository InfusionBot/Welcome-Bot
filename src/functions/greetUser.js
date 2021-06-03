/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const greetUser = function (guild, member) {
    let channel;
    let msg = `Welcome ${member} to the ${guild.name} server.`; //This string will be replaced to get from db afterwards
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${guild.name}`);
    //https://discord.js.org/#/docs/collection/master/class/Collection?scrollTo=find
    channel = guild.channels.cache.find((ch) => ch.name === "new-members");
    if (!channel) {
        channel = guild.channels.cache.find((ch) => ch.name === "general");
    }
    if (!channel) return;
    channel.send(msg);
};

module.exports = greetUser;
