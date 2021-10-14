/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "channelDelete",
    once: false,
    async execute(client, channel) {
        const guildDB = await client.models.Guild.findOne(channel.guild.id);
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await channel.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed({
                    tag: channel.name,
                    footer: `ID: ${channel.id}`,
                })
                    .setTitle(`${t("misc:chanDel")}`)
                    .setDesc("```diff\n" + `- ${channel.name}\n` + "```");
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
        //For music
        if (
            channel.type === "GUILD_VOICE" &&
            channel.members.has(client.user.id)
        ) {
            const player = client.manager.players.get(channel.guild.id);
            if (!player) return;
            player.destroy();
        }
    },
};
