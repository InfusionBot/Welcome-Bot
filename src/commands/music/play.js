/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Queue } = require("discord-player");
const { Permissions } = require("discord.js");
module.exports = {
    name: "play",
    aliases: ["joue"], //joue in french means play
    //description: "Play music",
    args: true,
    guildOnly: true,
    usage: "[name]",
    cooldown: 5,
    category: "Music",
    async execute(message, args, guildDB, t) {
        const name = args.join(" ");
        if (!name) return message.reply(t("cmds:play.missingSongName"));
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));

        if (
            message.guild.me.voice.channel &&
            message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
        )
            return message.reply(t("cmds:play.voiceChanDiff"));

        const botPerms = voice.permissionsFor(message.client.user);
        if (
            !botPerms.has(Permissions.FLAGS.CONNECT) ||
            !botPerms.has(Permissions.FLAGS.SPEAK)
        )
            return message.reply(
                t("errors:musicNoPerms", {
                    permissions: `${t("permissions:CONNECT")}, ${t(
                        "permissions:SPEAK"
                    )}`,
                })
            );

        let queue = message.client.player.getQueue(message.guild);
        if (!(queue instanceof Queue)) {
            queue = message.client.player.createQueue(message.guild, {
                metadata: message,
            });
            if (message.client.debug)
                message.client.logger.log("Creating new queue", "debug", [
                    "VOICE",
                ]);
        }
        try {
            if (!queue.connection)
                await queue.connect(message.member.voice.channel);
        } catch (e) {
            queue.destroy();
            message.client.logger.log(e, "error");
            return void message.reply(t("cmds:play.cantJoin"));
        }
        const song = await message.client.player.search(name, {
            requestedBy: message.author,
        });
        queue.addTrack(song.tracks[0]);
        if (!queue.nowPlaying()) return;
        queue.play();
    },
};
