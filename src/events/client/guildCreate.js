/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild) {
        const lang = guild.preferredLocale ?? "en-US";
        //Bot has been invited to a new guild
        await client.db.findOrCreateGuild(guild.id, lang);
        if (guild.systemChannelId) {
            const channel = await guild.channels.fetch(guild?.systemChannelId);
            const channel2 = guild.channels.cache.find(
                (c) =>
                    c.permissionsFor(client.user.id).has("SEND_MESSAGES") &&
                    c.type === "GUILD_TEXT"
            );
            const content = `Thank you for choosing this bot! To get started, type \`${client.config.defaultPrefix}help\`\nJoin the support server: ${client.config.supportGuildInvite}`;
            if (channel) {
                channel.send(content).catch(() => {
                    if (channel2) channel2.send(content);
                });
            } else if (channel2) {
                channel2.send(content);
            }
        }
        try {
            guild.me.setNickname(client.username).catch((e) => {
                throw e;
            });
        } catch (e) {
            if (e.toString().indexOf("Missing permissions") !== -1) {
                console.log(e);
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
        /*//Invite tracking
        if (guild.me.permissions.has("MANAGE_GUILD")) {
            //without manage guild we can't fetch invites :(
            guild.invites
                .fetch()
                .then((guildInvites) => {
                    client.invites.set(
                        guild.id,
                        new Map(guildInvites.map((inv) => inv.uses))
                    );
                })
                .catch(() => {});
        }*/
    },
};
