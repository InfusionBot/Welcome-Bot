/**
 * Copyright (c) 2021 S Dip
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "queueEnd",
    once: false,
    execute(client, player) {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new Embed({
            tag: client.user.username,
            avatarURL: client.user.displayAvatarURL(),
        }).setDescription(`${client.musicEmojis.warn} **Queue ended**`);
        channel.send({ embeds: [embed] });
    },
};
