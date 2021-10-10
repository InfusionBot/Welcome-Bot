/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Queue, QueryType } = require("discord-player");
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "play",
                aliases: ["joue"], //joue in french means play
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                    premiumOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Music",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const name = args.join(" ").replace("--playlist", "");
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

        const { player, connection } = message.client.music.findOrCreatePlayer(message.guild, voice);
        const tracks = await message.client.music.search(`ytsearch:30 ${name}`);
        if (!tracks || !tracks.length) {
            message.client.music.leave(message.guild);
            return message.channel.send(t("cmds:play.noResults"));
        }
        /*song.playlist
            ? queue.addTracks(song.tracks)
            : queue.addTrack(song.tracks[0]);
        if (song.playlist) {
            message.channel.send(
                t("cmds:play.playlistAdded", {
                    playlist: song.playlist.title,
                    songs: song.tracks.length,
                })
            );
        }
        if (!queue.playing) await queue.play();*/
        await message.client.music.play(message.guild, tracks[0]);
    }
};
