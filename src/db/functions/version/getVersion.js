/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Version = require("../../../db/models/Version");

module.exports = (versionName) => {
    return new Promise((resolve, reject) => {
        Version.where({ versionName }).findOne((err, ver) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (ver) {
                return resolve(ver);
            } else {
                return resolve(false);
            }
        });
    });
};
