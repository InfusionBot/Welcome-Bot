/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "np",
    aliases: ["now-playing"],
    //description: "The details of song you are currently playing",
    guildOnly: true,
    cooldown: 5,
    category: "Music",
    execute(message, args, guildDB, t) {
        const queue = message.client.player.getQueue(message.guild);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!queue) return message.reply(t("cmds:stop.notPlaying"));
        const track = queue.nowPlaying();
        let embed = new Embed({ color: "blue", timestamp: true })
            .setTitle(t("cmds:np.playing"))
            .setDescription(track.title)
            .addField(
                "Details",
                "> " +
                    t("cmds:play.details", {
                        source: track.source,
                        link: `[${track.url.slice(0, 35)}...](${track.url})`,
                        views: `${track.views}`,
                        duration: t("misc:duration", {
                            duration: track.duration,
                        }),
                    })
                        .split("\n")
                        .join("\n> ")
            );
        message.channel.send({ embeds: [embed] });
    },
};
