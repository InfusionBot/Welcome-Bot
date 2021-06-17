/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fs = require("fs");
const getGuild = require("../../db/functions/guild/getGuild");
const versionSender = require("../../functions/versionSender.js");
const presence = require("../../functions/presence.js");
const serverCount = require("../../functions/serverCount.js");

module.exports = {
    name: "eval",
    description: "Execute a statement",
    args: true,
    usage: "[statement]",
    cooldown: 20,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args, guildDB) {
        const content = args.join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));
        const clean = (text) => {
            if (typeof text === "string") {
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            } else {
                return text;
            }
        };

        return result
            .then((output) => {
                if (typeof output !== "string") {
                    output = require("util").inspect(output);
                }

                if (output.includes(message.client.token)) {
                    output = output.replace(message.client.token, "T0K3N");
                }
                message.channel.send("```\n" + clean(output) + "\n```");
            })
            .catch((err) => {
                err = err.toString();
                if (err.includes(message.client.token)) {
                    err = err.replace(message.client.token, "T0K3N");
                }
                message.channel.send("```\n" + clean(err) + "\n```");
            });
    },
};
