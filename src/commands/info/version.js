/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "version",
    description: "Information on a version",
    args: false,
    guildOnly: true,
    usage: "(version)",
    cooldown: 10,
    async execute(message, args) {
        const getVersion = require("../../db/functions/version/getVersion.js");
        if (!args[0]) args[0] = message.client.botVersion;
        if (args[0].startsWith("v")) {
            args[0] = args[0].replace("v", "");
        }
        let log = await getVersion(args[0] || message.client.botVersion);
        let reply = `Version: **${log.versionName}**`;
        log.changelog.forEach((change) => {
            reply += `\n- ${change}`;
        });
        message.channel.send(reply);
    },
};
