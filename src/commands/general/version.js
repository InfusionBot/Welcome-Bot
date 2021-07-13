/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getVersion = require("../../db/functions/version/getVersion.js");
const { Embed } = require("../../classes");
module.exports = {
    name: "version",
    aliases: ["ver"],
    //description: "Information on a version",
    args: false,
    usage: "(version)",
    cooldown: 10,
    category: "General",
    async execute(message, args, guildDB, t) {
        if (!args[0]) args[0] = message.client.botVersion;
        if (args[0].startsWith("v")) {
            args[0] = args[0].replace("v", "");
        }
        const embed = new Embed({
            color: "lightblue",
            tag: message.author.tag,
        });
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
        embed.setTitle(t("cmds:version.cmdDesc")).setDesc(reply);
        message.reply({ embeds: [embed] });
    },
};
