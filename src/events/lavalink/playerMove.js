/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "playerMove",
    once: false,
    async execute(client, player, oldChannel, newChannel) {
        if (!newChannel && oldChannel) {
            client.manager.emit("queueEnd", player);
        } else {
            player.voiceChannel = newChannel;
            if (player.paused) return;
            setTimeout(() => {
                player.pause(true);
                setTimeout(() => player.pause(false), client.ws.ping * 2);
            }, client.ws.ping * 2);
        }
    },
};
