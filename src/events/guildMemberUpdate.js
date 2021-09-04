/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(client, oldMember, newMember) {
        if (client.debugLevel > 0)
            client.logger.log("guildMemberUpdate event", "debug");
        if (oldMember.equals(newMember) || newMember.user.bot) return;
        let diff = "```\n";
        const { cache: oldRoles } = oldMember.roles;
        const { cache: newRoles } = newMember.roles;
        const diffRoles1 = oldRoles
            .difference(newRoles)
            .map((r) => "+ " + r.name);
        const diffRoles2 = newRoles
            .difference(oldRoles)
            .map((r) => "+ " + r.name);
        if (diffRoles1.size > 0 || diffRoles2.size > 0) {
            const diff1 = [...diffRoles1.values()];
            const diff2 = [...diffRoles2.values()];
            diff += `${t("misc:roles")}\n+ ${diff1.join(
                "\n+ "
            )}\n- ${diff2.join("\n- ")}`;
        }
        diff += "\n```";
        let guildDB;
        if (newMember.guild) {
            guildDB = await client.db.findOrCreateGuild(newMember.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await newMember.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed()
                    .setTitle(t("misc:mem_update"))
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
