/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { convertTime } = require("../../helpers/Util");
const { Embed } = require("../../classes");
module.exports = {
    name: "trackStart",
    once: false,
    async execute(client, player, track /*, payload*/) {
        const guildDB = await client.db.findOrCreateGuild(player.guild);
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        const channel = player.get("channel");
        const embed = new Embed({
            tag: track.requester.tag,
            avatarURL: track.requester.displayAvatarURL(),
        })
            .setTitle(
                `${client.musicEmojis.play} **${t("cmds:play.starting")}**`
            )
            .setDescription(
                `[${track.title}](${track.uri}) - \`[${convertTime(
                    track.duration
                )}]\`\n[<@${track.requester.id}>]`
            )
            .setThumbnail(track.displayThumbnail("3"))
            .setFooter(client.user.username, client.user.displayAvatarURL());
        channel.send({ embeds: [embed] });
    },
};
