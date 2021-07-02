/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "version",
    aliases: ["ver"],
    //description: "Information on a version",
    args: false,
    usage: "(version)",
    cooldown: 10,
    category: "Information",
    async execute(message, args, guildDB) {
        const getVersion = require("../../db/functions/version/getVersion.js");
        if (
            args[0] &&
            args[0].toLowerCase() === "unsubscribe" &&
            message.guild
        ) {
            message.reply(
                `This subcommand will be removed soon.\nInstead create a new channel (recommended to use \`#w-bot-news\`), then send \`${guildDB.prefix}follow #chan\` where #chan is the channel you created now.`
            );
        } else if (
            args[0] &&
            args[0].toLowerCase() === "subscribe" &&
            message.guild
        ) {
            message.reply(
                `This subcommand will be removed soon.\nInstead create a new channel (recommended to use \`#w-bot-news\`), then send \`${guildDB.prefix}follow #chan\` where #chan is the channel you created now.`
            );
        }

        if (!args[0]) args[0] = message.client.botVersion;
        if (args[0].startsWith("v")) {
            args[0] = args[0].replace("v", "");
        }
        let log = await getVersion(args[0].trim() || message.client.botVersion);
        let reply;
        if (log) {
            reply = `Version: **${log.versionName}**`;
            log.changelog.forEach((change) => {
                if (change.startsWith("**")) {
                    reply += `\n${change}`;
                } else {
                    reply += `\n- ${change}`;
                }
            });
        } else {
            reply = `Version \`${args[0]}\` does not exist or is very old! Latest version is: \`v${message.client.botVersion}\``;
        }
        message.channel.send(reply);
    },
};
