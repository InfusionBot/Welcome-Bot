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
                name: "back",
                aliases: ["prevoius"],
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

    //eslint-disable-next-line no-unused-vars
    async execute({ message }, t) {
        const player = this.client.manager.get(message.guild.id);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (
            !player ||
            (!player.playing && !player.paused && !player.queue.size)
        )
            return message.reply(t("cmds:stop.notPlaying"));
        const members = voice.members.filter((m) => !m.user.bot);
        const embed = new Embed({ color: "blue", timestamp: true }).setTitle(
            t("cmds:back.cmdDesc")
        );
        const msg = await message.channel.send({ embeds: [embed] });
        if (members.size > 1) {
            //More than half members in that voice channel should vote with 👍 to stop the music.
            msg.react("👍");
            const moreVotes = Math.floor(members.size / 2 + 1); //If there are 10 members, at least 5 + 1 members should vote
            msg.edit({
                embeds: [
                    embed.setDesc(
                        t("cmds:back.pleaseVote", {
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
                    if (player.back()) {
                        msg.edit({
                            embeds: [embed.setDesc(t("cmds:back.success"))],
                        });
                    } else {
                        msg.edit({
                            embeds: [embed.setDesc(t("cmds:back.failure"))],
                        });
                    }
                    collector.stop();
                } else {
                    msg.edit({
                        embeds: [
                            embed.setDesc(
                                t("cmds:back.pleaseVote", {
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
        } else if (player.back()) {
            msg.edit({
                embeds: [embed.setDesc(t("cmds:back.success"))],
            });
        } else {
            msg.edit({
                embeds: [embed.setDesc(t("cmds:back.failure"))],
            });
        }
    }
};
