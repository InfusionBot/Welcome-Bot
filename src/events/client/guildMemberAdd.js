/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        let guildDB = await client.db.findOrCreateGuild(member.guild.id);
        if (!guildDB) {
            await client.wait(5000); //wait 5 secs
            guildDB = await client.models.Guild.findOne(member.guild.id);
            if (!guildDB) return;
        }
        // When a new member joins
        require("../../functions/greetUser")(member);
        const t = client.i18next.getFixedT(guildDB.lang ?? "en-US");
        if (guildDB.plugins.autorole.enabled) {
            member.roles
                .add(guildDB.plugins.autorole.role, "Auto Role")
                .catch(() => {});
        }
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await member.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed({
                    tag: member.user.tag,
                    avatarURL: member.user.displayAvatarURL(),
                    footer: `ID: ${member.user.id}`,
                })
                    .setTitle(`${t("misc:mem_join")}`)
                    .setDesc(
                        `**${t("misc:accCreated")}**: ${new Date(
                            member.user.createdAt
                        )}`
                    );
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
    },
};
