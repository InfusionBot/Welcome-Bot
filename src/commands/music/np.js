/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
const { convertTime } = require("../../helpers/Util");
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
        const player = this.client.manager.get(message.guild.id);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (
            !player ||
            (!player.playing && !player.paused && !player.queue.size)
        )
            return message.reply(t("cmds:stop.notPlaying"));
        const track = player.queue.current;
        const embed = new Embed({ color: "blue", timestamp: true })
            .setTitle(t("cmds:np.playing"))
            .setDescription(track.title)
            .setImage(track.displayThumbnail("mqdefault"))
            .addField(
                "Details",
                "> " +
                    t("cmds:play.details", {
                        link: `[${track.uri.slice(0, 35)}...](${track.uri})`,
                        duration: convertTime(track.duration),
                    })
                        .split("\n")
                        .join("\n> ")
            );
        message.channel.send({ embeds: [embed] });
    }
};
