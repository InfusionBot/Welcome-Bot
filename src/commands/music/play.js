/**
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
                    //premiumOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Music",
            },
            client
        );
    }

    async execute({ message, args }, t) {
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
                volume: 50,
                selfDeafen: true,
            });
        if (player.state !== "CONNECTED") player.connect();
        player.set("autoplay", false);
        player.set("247", false);
        player.set("author", message.author);
        player.set("channel", message.channel);
        let res;
        try {
            res = await player.search(name, message.author);
            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (e) {
            if (this.client.isOwner(message.author.id))
                return message.reply(`${t("errors:generic")}: ${e.message}`);
            return console.log(e);
        }
        let embed,
            max = 5,
            results,
            collected,
            first,
            index,
            track;
        const filter = (m) =>
            m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
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
                    .setTitle(
                        `${this.client.musicEmojis.playlist} **${t(
                            "cmds:play.playlist"
                        )}**`
                    )
                    .setDescription(
                        `**${res.playlist.name}** - \`[${convertTime(
                            res.playlist.duration
                        )}]\`\n${t("cmds:play.queueAddCount", {
                            count: res.tracks.length,
                        })}`
                    );
                message.channel.send({ embeds: [embed] });
                break;
            case "TRACK_LOADED":
                track = res.tracks[0];
                player.queue.add(track);
                this.start(player, track, message, t);
                break;
            case "SEARCH_RESULT":
                if (res.tracks.length < max) max = res.tracks.length;

                results = res.tracks
                    .slice(0, max)
                    .map((track, index) => `${++index}. ${track.title}`)
                    .join("\n");
                embed = new Embed()
                    .setTitle(t("cmds:play.select"))
                    .setDescription(
                        `\`\`\`yaml\n${results}\`\`\`\n${t(
                            "cmds:play.cancelText"
                        )}`
                    );
                message.channel.send({ embeds: [embed] });

                try {
                    collected = await message.channel.awaitMessages({
                        max: 1,
                        time: 30e3, //30*10³ = 30000
                        errors: ["time"],
                        filter,
                    });
                } catch (e) {
                    /*if (!player.queue.current) player.destroy();
                    return message.reply("you didn't provide a selection.");*/
                    index = 0;
                    if (this.client.debug) console.log(e);
                }

                if (collected?.size > 0) {
                    first = collected.first().content;
                    if (first.toLowerCase() === "cancel") {
                        if (!player.queue.current) player.destroy();
                        return message.channel.send(t("cmds:play.cancelled"));
                    }
                    index = Number(first) - 1;
                    if (index < 0 || index > max - 1)
                        return message.reply(
                            `The number you provided too small or too big (1-${max}).`
                        );
                }
                track = res.tracks[index];
                player.queue.add(track);
                this.start(player, track, message, t);
                break;
            default:
                this.client.logger.debug(`Unhandled loadType: ${res.loadType}`);
                break;
        }
    }

    start(player, track, message, t) {
        if (!player.playing && !player.paused && !player.queue.size) {
            player.play();
        } else {
            const embed = new Embed({
                tag: track.requester.tag,
                avatarURL: track.requester.displayAvatarURL(),
            })
                .setTimestamp()
                .setThumbnail(track.displayThumbnail("hqdefault"))
                .setTitle(
                    `${this.client.musicEmojis.queue} **${t(
                        "cmds:play.queueAdded"
                    )}**`
                )
                .setDescription(
                    `[${track.title}](${track.uri}) - \`[${convertTime(
                        track.requester.id
                    )}]\``
                )
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                );
            message.channel.send({ embeds: [embed] });
        }
    }
};
