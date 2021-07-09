/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "volume",
    aliases: ["sound-level"],
    //description: "Adjust the volume of the music",
    guildOnly: true,
    cooldown: 5,
    category: "Music",
    async execute(message, args, guildDB, t) {
        const queue = message.client.player.getQueue(message.guild);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!queue) return message.reply(t("cmds:stop.notPlaying"));
        const amount = parseInt(args[0]);
        if (amount < 0 || amount > 200) {
            return message.reply(t("errors:invalidNumRange", {
                min: 0,
                max: 200
            }));
        }
        queue.setVolume(amount);
        message.reply(t("cmds:volume.success", {
            volume: amount
        }));
    },
};
