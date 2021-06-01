/**
 * Discord Welcome bot
 * Copyright (c) 2021 The BaalKrshna Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const greetUser = function (guild, member) {
    let channel;
    //https://discord.js.org/#/docs/collection/master/class/Collection?scrollTo=find
    channel = guild.channels.cache.find((ch) => ch.name === "new-members");
    if (!channel) {
        channel = guild.channels.cache.find((ch) => ch.name === "general");
    }
    if (!channel) return;
    channel.send(`Welcome, ${member}`);
};

module.exports = greetUser;
