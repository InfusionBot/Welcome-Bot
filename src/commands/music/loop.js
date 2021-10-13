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
                name: "loop",
                aliases: ["setloop"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: true,
                    subcommand: true,
                },
                subcommands: [
                    {
                        name: "off",
                        desc: "Turn off loop mode and don't autoplay also",
                    },
                    { name: "track", desc: "Enable loop of current track" },
                    { name: "queue", desc: "Enable loop of current queue" },
                    {
                        name: "autoplay",
                        desc: "Just keep playing next songs in queue and end when queue finishes",
                    },
                ],
                disabled: false,
                cooldown: 10,
                category: "Music",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const queue = message.client.player.getQueue(message.guild);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!queue || !queue.playing)
            return message.reply(t("cmds:stop.notPlaying"));
        let loopMode = args[0].toLowerCase();
        switch (loopMode) {
            case "off":
                loopMode = QueueRepeatMode.OFF;
                break;
            case "track":
                loopMode = QueueRepeatMode.TRACK;
                break;
            case "queue":
                loopMode = QueueRepeatMode.QUEUE;
                break;
            case "autoplay":
                loopMode = QueueRepeatMode.AUTOPLAY;
                break;
            default:
                return message.reply(
                    t("cmds:loop.invalidMode", {
                        prefix: guildDB.prefix,
                        mode: loopMode,
                    })
                );
                break;
        }
        const emoji =
            loopMode === QueueRepeatMode.TRACK
                ? "🔂"
                : loopMode === QueueRepeatMode.QUEUE
                ? "🔁"
                : "▶";
        const members = voice.members.filter((m) => !m.user.bot);
        const embed = new Embed({ color: "blue", timestamp: true }).setTitle(
            t("cmds:loop.cmdDesc")
        );
        const msg = await message.channel.send({ embeds: [embed] });
        if (members.size > 1) {
            //More than half members in that voice channel should vote with 👍 to stop the music.
            msg.react("👍");
            const moreVotes = Math.floor(members.size / 2 + 1); //If there are 10 members, at least 5 + 1 members should vote
            msg.edit({
                embeds: [
                    embed.setDesc(
                        t("cmds:loop.pleaseVote", {
                            count: moreVotes,
                        })
                    ),
                ],
            });
            const collector = await msg.createReactionCollector({
                filter: (reaction, user) => {
                    const member = message.guild.members.cache.get(user.id);
                    const voiceChan = member.voice.channel;
                    if (voiceChan) {
                        return voiceChan.id === voice.id;
                    }
                    return false;
                },
                time: 25000, //25 secs
            });
            collector.on("collect", (reaction) => {
                const haveVoted = reaction.count - 1;
                if (haveVoted >= moreVotes) {
                    queue.setRepeatMode(loopMode);
                    msg.edit({
                        embeds: [
                            embed.setDesc(
                                `${emoji} | ${t("cmds:loop.success")}`
                            ),
                        ],
                    });
                    collector.stop();
                } else {
                    msg.edit({
                        embeds: [
                            embed.setDesc(
                                t("cmds:stop.pleaseVote", {
                                    count: moreVotes,
                                })
                            ),
                        ],
                    });
                }
            });
            collector.on("end", (collected, isDone) => {
                if (!isDone) {
                    return message.reply(t("misc:timeout"));
                }
            });
        } else {
            queue.setRepeatMode(loopMode);
            msg.edit({
                embeds: [
                    embed.setDesc(
                        `${emoji} | ${t("cmds:loop.success", {
                            mode: args[0],
                        })}`
                    ),
                ],
            });
        }
    }
};
