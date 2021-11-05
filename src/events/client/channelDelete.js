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
        let guildDB;
        try {
            guildDB = await client.models.Guild.findOne({
                guildId: channel.guild.id,
            });
            if (!guildDB) {
                guildDB = await client.db.findOrCreateGuild(channel.guild.id);
            }
            // eslint-disable-next-line no-empty
        } catch (e) {}
        if (!guildDB) return;
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (
            guildDB.plugins.serverlogs.enabled &&
            !["GUILD_CATEGORY"].includes(channel.type)
        ) {
            const serverLogs = await channel.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (serverLogs) {
                const embed = new Embed({
                    tag: channel.name,
                    footer: `ID: ${channel.id}`,
                })
                    .setTitle(`${t("misc:chanDel")}`)
                    .setDesc("```diff\n" + `- ${channel.name}\n` + "```");
                serverLogs
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
