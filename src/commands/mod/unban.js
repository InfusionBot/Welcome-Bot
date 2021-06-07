/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "unban",
    //aliases: [],
    description: "Unban a user.",
    permissions: ["MANAGE_SERVER"],
    args: true,
    usage: "[@mention] (reason)",
    execute(message, args) {
        const getUserFromMention = require("../../functions/getUserFromMention.js");
    },
};
