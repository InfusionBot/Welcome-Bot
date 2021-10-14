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
                name: "stop",
                aliases: ["leave"],
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

    async execute({ message }, t) {
        const player = this.client.manager.get(message.guild.id);
        const voice = message.member.voice.channel;
        if (!voice) return message.reply(t("cmds:play.voiceNotJoined"));
        if (!player || !player.playing)
            return message.reply(t("cmds:stop.notPlaying"));
        const members = voice.members.filter((m) => !m.user.bot);
        const embed = new Embed({ color: "blue", timestamp: true }).setTitle(
            t("cmds:stop.cmdDesc")
        );
        const msg = await message.channel.send({ embeds: [embed] });
        if (members.size > 1) {
            //More than half members in that voice channel should vote with 👍 to stop the music.
            msg.react("👍");
            const moreVotes = Math.floor(members.size / 2 + 1); //If there are 10 members, at least 5 + 1 members should vote
            msg.edit({
                embeds: [
                    embed.setDesc(
                        t("cmds:stop.pleaseVote", {
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
                    player.destroy();
                    msg.edit({
                        embeds: [embed.setDesc(t("cmds:stop.success"))],
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
            player.destroy();
            msg.edit({
                embeds: [embed.setDesc(`🛑 | ${t("cmds:stop.success")}`)],
            });
        }
    }
};
