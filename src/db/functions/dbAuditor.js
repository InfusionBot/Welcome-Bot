/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Guild = require("../../schema/guildSchema");
const removeGuild = require("./removeGuild");
const addGuild = require("./addGuild");

module.exports = (client) => {
    const actualGuilds = client.guilds.cache.map((guild) => guild.id);

    Guild.where({}).find((err, guilds) => {
        if (err) {
            console.log(err);
        } else {
            guildIdArray = guilds.map((guild) => guild.guildId);
            guildIdArray.forEach((guildId) => {
                if (!actualGuilds.includes(guildId)) {
                    removeGuild(guildId);
                }
            });

            actualGuilds.forEach((guildId) => {
                if (!guildIdArray.includes(guildId)) {
                    addGuild(guildId);
                }
            });
        }
    });
    console.log("Database audited");
};
