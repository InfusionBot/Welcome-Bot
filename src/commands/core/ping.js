/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "ping",
    aliases: ["latency"],
    description: "Ping the bot",
    cooldown: 5,
    category: "General",
    execute(message, args) {
        let msg = `Pong ${message.author}\nWebsocket heartbeat: ${message.client.ws.ping}ms.`;
        message.channel
            .send(msg + `\nGetting roundtrip latency`)
            .then((sent) => {
                sent.edit(
                    msg +
                        `\nRoundtrip latency: ${
                            sent.createdTimestamp - message.createdTimestamp
                        }ms`
                );
            });
    },
};
