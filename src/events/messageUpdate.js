/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const execute = require("../functions/execute");
module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(client, message) {
        if (client.debugLevel > 0)
            client.logger.log("messageUpdate event", "debug");
        let guildDB;
        if (message.guild && message.channel.type !== "DM") {
            guildDB = await client.guildDbFuncs.getGuild(message.guild.id);
        } else {
            guildDB = { prefix: client.config.defaultPrefix, disabled: [] };
        }
        if (
            message.channel.type === "GUILD_NEWS" &&
            guildDB.plugins.autopublish
        )
            message.crosspost().catch(() => {});
    },
};
