/**
 * Copyright (c) 2021 S Dip
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { convertTime } = require("../../helpers/Util");
const { Embed } = require("../../classes");
module.exports = {
    name: "tractStart",
    once: false,
    execute(client, player, track /*, payload*/) {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new Embed()
            .setDescription(
                `${client.musicEmojis.play} **Started Playing**\n [${
                    track.title
                }](${track.uri}) - \`[${convertTime(track.duration)}]\` [<@${
                    track.requester.id
                }>]`
            )
            .setThumbnail(track.displayThumbnail("3"))
            .setFooter(
                player.message.author.tag,
                player.message.author.displayAvatarURL()
            );
        channel.send({ embeds: [embed] });
    },
};
