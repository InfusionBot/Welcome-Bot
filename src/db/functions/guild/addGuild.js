/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const Guild = require("../../../schema/guildSchema");

module.exports = (guildId, lang="en-US", disabled=["welcome", "goodbye"]) => {
    return new Promise((resolve, reject) => {
        let guild = new Guild({
            guildId,
            lang,
            disabled,
        });

        guild.save((err) => {
            if (err) {
                console.log(err);
                return reject("Could Not Save Guild");
            } else {
                return resolve(guild);
            }
        });
    });
};
