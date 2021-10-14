/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const ms = require("ms");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "seek",
                aliases: ["skip-to"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Music",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args }, t) {
        const player = this.client.manager.get(message.guild.id);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!player || !player.playing)
            return message.reply(t("cmds:stop.notPlaying"));
        const time = ms(args.join(" "));
        if (isNaN(time)) {
            return message.reply(t("cmds:seek.invalidTime"));
        }
        if (player.seek(time)) message.react("👍");
        else message.react("❌");
    }
};
