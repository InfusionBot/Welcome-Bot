/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "messageDelete",
    once: false,
    async execute(client, message) {
        if (message.partial || (message.embeds.length && !message.content))
            return; // content is null or deleted embed
        client.snipes.set(message.channel.id, {
            ...message,
            image: message.attachments.first()
                ? message.attachments.first().proxyURL
                : null,
        });
        if (message.author.bot || !message.guild) return;
        const guildDB = await client.models.Guild.findOne({
            guildId: message.guild.id,
        });
        if (!guildDB) return;
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await message.guild.channels.fetch(
                guildDB.plugins.serverlogs.channel
            );
            if (channel) {
                const embed = new Embed({
                    tag: message.author.tag,
                    avatarURL: message.author.displayAvatarURL(),
                    footer: `ID: ${message.author.id}`,
                })
                    .setTitle(`${t("misc:deleted")}`)
                    .setDesc(`- ${message.content}\n`);
                channel
                    .send({
                        embeds: [embed],
                    })
                    .catch(() => {});
            }
        }
    },
};
