/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
// eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "volume",
                aliases: ["sound-level"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Music",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const player = this.client.manager.get(message.guild.id);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (
            !player ||
            (!player.playing && !player.paused && !player.queue.size)
        )
            return message.reply(t("cmds:stop.notPlaying"));
        const amount = parseInt(args[0]);
        if (isNaN(amount)) {
            return message.reply(
                `🎧 | ${t("cmds:volume.current", { volume: player.volume })}`
            );
        }
        if (amount < 0 || amount > 200) {
            return message.reply(
                `❌ | ${t("errors:invalidNumRange", {
                    min: 0,
                    max: 200,
                })}`
            );
        }
        player.setVolume(amount);
        const emoji =
            this.client.musicEmojis[
                amount >= 100
                    ? "volumehigh"
                    : amount < 50
                    ? "volumelow"
                    : "volumemiddle"
            ];
        message.reply(
            `${emoji} | ${t("cmds:volume.success", {
                volume: amount,
            })}`
        );
    }
};
