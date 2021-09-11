/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(client, oldMember, newMember) {
        if (client.debugLevel > 0)
            client.logger.log("guildMemberUpdate event", "debug");
        if (oldMember.equals(newMember) || newMember.user.bot) return;
        let guildDB;
        if (newMember.guild) {
            guildDB = await client.db.findOrCreateGuild(newMember.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        let diff = "";
        const addedRoles = [];
        newMember.roles.cache.forEach((role) => {
            if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role.name);
        });
        const removedRoles = [];
        oldMember.roles.cache.forEach((role) => {
            if (!newMember.roles.cache.has(role.id))
                removedRoles.push(role.name);
        });
        if (addedRoles.length > 0 || removedRoles.length > 0) {
            diff += `\n**${t("misc:roles")}**\n`;
            diff += "```diff";
            if (addedRoles.length > 0) {
                diff += `\n+ ${addedRoles.join("\n+ ")}`;
            }
            if (removedRoles.length > 0) {
                diff += `\n- ${removedRoles.join("\n- ")}`;
            }
        } else if (oldMember.nickname !== newMember.nickname) {
            diff += `\n**${t("misc:nickModify")}**\n`;
            diff += "```diff";
            diff += `\n- ${oldMember.nickname ?? oldMember.user.username}`;
            diff += `\n+ ${newMember.nickname ?? newMember.user.username}`;
        }
        diff += "\n```";
        diff = diff.trim();
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await newMember.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed()
                    .setTitle(`${t("misc:mem_update")} - ${newMember.user.tag}`)
                    .setDesc(diff);
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
    },
};
