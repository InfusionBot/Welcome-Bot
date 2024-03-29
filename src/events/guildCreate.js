/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild) {
        const lang = guild.preferredLocale ?? "en-US";
        //Bot has been invited to a new guild
        await client.db.findOrCreateGuild(guild.id, lang);
        if (guild.systemChannelId) {
            const channel = await guild.channels.fetch(guild?.systemChannelId);
            const content = `Thank you for choosing this bot! To get started, type \`${client.config.defaultPrefix}help\`\nJoin the support server: ${client.config.supportGuildInvite}`;
            if (channel) {
                channel.send(content).catch(() => {
                    guild.channels.cache
                        .find(
                            (c) =>
                                c
                                    .permissionsFor(client.user.id)
                                    .has("SEND_MESSAGES") &&
                                c.type === "GUILD_TEXT"
                        )
                        .send(content);
                });
            }
        }
        const bots = guild.members.cache.filter((m) => m.user.bot).size;
        const embed = new Embed({ color: "success", timestamp: true })
            .setTitle(`:white_check_mark: Added to "${guild.name}"`)
            .setDescription(`${guild.id}`)
            .addField(
                "Info",
                `Shard: ${guild.shardId}\nOwner: <@${
                    guild.ownerId
                }>\nMembers: ${guild.memberCount}\nHumams: ${Math.round(
                    (bots / guild.memberCount) * 100
                )}%`
            );
        client.channels.cache
            .get(client.config.logsChannelId)
            .send({ embeds: [embed] });
    },
};
