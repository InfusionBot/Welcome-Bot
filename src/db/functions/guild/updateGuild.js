/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Guild = require("../../../db/models/Guild");

module.exports = (guildId, property, value) => {
    return new Promise((resolve, reject) => {
        Guild.where({ guildId }).updateOne({ [property]: value }, (err) => {
            if (err) {
                return reject("Could not update guild");
            } else {
                return resolve("Guild Updated");
            }
        });
    });
};
