/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const User = require("../../../db/models/User");

module.exports = (userId) => {
    return new Promise((resolve, reject) => {
        User.where({ userId }).deleteOne((err) => {
            if (err) {
                return reject("Could not delete user");
            } else {
                return resolve("User Deleted");
            }
        });
    });
};
