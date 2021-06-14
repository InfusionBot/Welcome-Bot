/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "version",
    aliases: ["ver"],
    description: "Information on a version",
    args: false,
    usage: "(version)",
    cooldown: 10,
    category: "Information",
    execute: async (message, args) => {
        const getVersion = require("../../db/functions/version/getVersion.js");
        const updateGuild = require("../../db/functions/guild/updateGuild.js");
        if (
            args[0] &&
            args[0].toLowerCase() === "unsubscribe" &&
            message.guild
        ) {
            if (updateGuild(message.guild.id)) {
                message.channel.send("Successfully unsubscribed!");
            } else {
                message.channel.send("An error occurred.");
            }
            return;
        } else if (
            args[0] &&
            args[0].toLowerCase() === "subscribe" &&
            message.guild
        ) {
            if (subscribe()) {
                message.channel.send("Successfully subscribed!");
            } else {
                message.channel.send("An error occurred.");
            }
        } else if (
            !message.guild &&
            args[0] &&
            (args[0].toLowerCase() === "subscribe" ||
                args[0].toLowerCase() === "unsubscribe")
        ) {
            message.channel.send(
                "We don't send version updates by DMs. If you want to unsubscribe/subscribe for version updates, do it in a server."
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
