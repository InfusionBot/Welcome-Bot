/**
 * Copyright (c) 2021 S Dip
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { convertTime } = require("../../helpers/Util");
const { Embed } = require("../../classes");
module.exports = {
    name: "trackStart",
    once: false,
    execute(client, player, track /*, payload*/) {
        const channel = client.channels.cache.get(player.textChannel);
        const author = player.get("author");
        const embed = new Embed({
            tag: author.tag,
            avatarURL: author.displayAvatarURL(),
        })
            .setDescription(
                `${client.musicEmojis.play} **Started Playing**\n [${
                    track.title
                }](${track.uri}) - \`[${convertTime(track.duration)}]\` [<@${
                    track.requester.id
                }>]`
            )
            .setThumbnail(track.displayThumbnail("3"));
        channel.send({ embeds: [embed] });
    },
};
