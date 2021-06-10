/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "ping",
    //aliases: [],
    description: "Ping the bot",
    cooldown: 5,
    execute(message, args) {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Pong ${message.author}, This message had a latency of ${timeTaken}ms.`);
    },
};
