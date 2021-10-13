/**
 * Copyright (c) 2021 S Dip
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { convertTime } = require("../../helpers/Util");
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
                cooldown: 5,
                category: "Music",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        //Thanks to https://github.com/brblacky/lavamusic
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

        const player =
            this.client.manager.get(message.guild.id) ||
            this.client.manager.create({
                guild: message.guild.id,
                voiceChannel: voice.id,
                textChannel: message.channel.id,
                message,
                volume: 50,
                selfDeafen: true,
            });
        if (player.state !== "CONNECTED") player.connect();
        player.set("autoplay", false);
        let res;
        try {
            res = await player.search(name, message.author);
            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            return message.reply(
                `An error occurred while searching: ${err.message}`
            );
        }
        let track, embed;
        switch (res.loadType) {
            case "NO_MATCHES":
                if (!player.queue.current) player.destroy();
                return message.reply(t("cmds:play.noResults"));
            case "PLAYLIST_LOADED":
                player.queue.add(res.tracks);
                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                    player.play();
                embed = new Embed()
                    .setTimestamp()
                    .setDescription(
                        `**Added Playlist to queue**\n${
                            res.tracks.length
                        } Songs **${res.playlist.name}** - \`[${convertTime(
                            res.playlist.duration
                        )}]\``
                    );
                message.channel.send({ embeds: [embed] });
                break;
            case "TRACK_LOADED":
            case "SEARCH_RESULT":
                track = res.tracks[0];
                player.queue.add(track);
                if (!player.playing && !player.paused && !player.queue.size) {
                    player.play();
                } else {
                    embed = new Embed()
                        .setTimestamp()
                        .setThumbnail(track.displayThumbnail("hqdefault"))
                        .setDescription(
                            `**Added to queue**\n[${track.title}](${
                                track.uri
                            }) - \`[${convertTime(track.duration)}]\` [<@${
                                track.requester.id
                            }>]`
                        );
                    message.channel.send({ embeds: [embed] });
                }
                break;
            default:
                this.client.logger.debug(`Unhandled loadType: ${res.loadType}`);
                break;
        }
    }
};
