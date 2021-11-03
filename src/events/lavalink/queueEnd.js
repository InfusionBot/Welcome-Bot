/**
 * Copyright (c) 2021 S Dip
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "queueEnd",
    once: false,
    async execute(client, player) {
        const guildDB = await client.db.findOrCreateGuild(player.guild);
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        const channel = player.get("channel");
        const author = player.get("author");
        const embed = new Embed({
            tag: author.tag,
            avatarURL: author.displayAvatarURL(),
        })
            .setDescription(
                `${client.musicEmojis.warn} ${t("cmds:play.queueEnd")}`
            )
            .setFooter(client.user.tag, client.user.displayAvatarURL());
        channel.send({ embeds: [embed] });
        player.destroy();
    },
};
