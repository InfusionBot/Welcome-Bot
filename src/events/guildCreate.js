/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "guildCreate",
    once: false,
    execute(client, guild) {
        const lang = guild.preferredLocale || "en-US";
        //Bot has been invited to a new guild
        client.guildDbFuncs.addGuild(guild.id, lang);
        if (guild.systemChannelID) {
            guild.channels.cache
                .get(guild.systemChannelID)
                .send(
                    `Thank you for choosing this bot! To get started, type \`${
                        client.config.defaultPrefix
                    }help\`\nJoin the support server: ${client.config.supportGuildInviteReal(
                        client
                    )}`
                )
                .catch(() => {});
        }
        const embed = new Embed({ color: "success", timestamp: true })
            .setTitle(`:white_check_mark: Added to "${guild.name}"`)
            .setDescription(`${guild.id}`)
            .addField(
                "Info",
                `Shard: ${guild.shardId}\nOwner: <@${guild.ownerId}>\nMembers: ${guild.memberCount}`
            );
        client.channels.cache
            .get(client.config.logsChannelId)
            .send({ embeds: [embed] });
    },
};
