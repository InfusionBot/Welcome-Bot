/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Guild = require("../../../db/models/Guild");

module.exports = (guildId) => {
    return new Promise((resolve, reject) => {
        Guild.where({ guildId }).findOne((err, guild) => {
            if (err) {
                return reject("Error finding guild");
            } else if (guild) {
                return resolve(guild);
            } else {
                return reject("No guild with guild ID " + guildId);
            }
        });
    });
};
