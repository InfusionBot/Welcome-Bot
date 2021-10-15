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
                name: "247",
                aliases: ["24/7"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                    premiumOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Music",
            },
            client
        );
    }

    async execute({ message }, t) {
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        const player = this.client.manager.get(message.guild.id);
        if (
            !player ||
            (!player.playing && !player.paused && !player.queue.size)
        )
            return message.reply(t("cmds:stop.notPlaying"));
        player.set("247", !player.get("247"));
        message.react("✅");
    }
};
