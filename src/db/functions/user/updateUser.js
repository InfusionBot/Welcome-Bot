/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const User = require("../../../db/models/User");

module.exports = (userId, property, value) => {
    return new Promise((resolve, reject) => {
        User.where({ userId }).updateOne({ [property]: value }, (err) => {
            if (err) {
                return reject(err);
            } else {
                return resolve("User Updated");
            }
        });
    });
};
