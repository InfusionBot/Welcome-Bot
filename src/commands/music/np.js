/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "np",
                aliases: ["now-playing"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Music",
            },
            client
        );
    }

    async execute({ message }, t) {
        const queue = message.client.player.getQueue(message.guild);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!queue || !queue.playing)
            return message.reply(t("cmds:stop.notPlaying"));
        const track = queue.nowPlaying();
        const progress = queue.createProgressBar().split(" ┃ ");
        const embed = new Embed({ color: "blue", timestamp: true })
            .setTitle(t("cmds:np.playing"))
            .setDescription(track.title)
            .setImage(track.thumbnail)
            .addField(
                "Details",
                "> " +
                    t("cmds:play.details", {
                        source: track.source,
                        link: `[${track.url.slice(0, 35)}...](${track.url})`,
                        views: `${track.views}`,
                        duration: track.duration,
                        progress: `${progress[0]} ┃ ${progress[2]}\n${progress[1]}`,
                    })
                        .split("\n")
                        .join("\n> ")
            );
        message.channel.send({ embeds: [embed] });
    }
};
