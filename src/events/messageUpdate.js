/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../classes");
module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(client, oldMessage, message) {
        if (client.debugLevel > 0)
            client.logger.log("messageUpdate event", "debug");
        let guildDB;
        if (message.guild && message.channel.type !== "DM") {
            guildDB = await client.db.findOrCreateGuild(message.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        const t = client.i18next.getFixedT(guildDB.lang || "en-US");
        if (
            message.channel.type === "GUILD_NEWS" &&
            guildDB.plugins.autopublish
        )
            message.crosspost().catch(() => {});
        if (guildDB.plugins.serverlogs.enabled) {
            const channel = await message.guild.channels.fetch(guildDB.plugins.serverlogs.channel);
            if (channel) {
                const embed = new Embed()
                    .setTitle(t("misc:edited"))
                    .setDesc(
                        "```\n" +
                        `- ${oldMessage.content}\n` +
                        `+ ${message.content}\n` +
                        "```"
                    );
                channel.send({
                    embeds: [embed]
                }).catch(() => {});
            }
        }
    },
};
