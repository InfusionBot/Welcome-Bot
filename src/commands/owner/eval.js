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
const { inspect } = require("util");
const { Embed } = require("../../classes");

module.exports = {
    name: "eval",
    //description: "Execute a statement",
    args: true,
    usage: "[statement]",
    cooldown: 20,
    ownerOnly: true,
    category: "Owner Only",
    execute(message, args, guildDB, t) {
        const client = message.client;
        const content = args.join(" ");
        const embed = new Embed({ color: "success" }).setTitle(content);
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
                    output = inspect(output, { depth: 0 }); //depth should be 0 as it will give contents of object in a property, in this object. That makes the message too long.
                }

                if (output.includes(message.client.token)) {
                    output = output.replace(message.client.token, "T0K3N");
                }
                message.reply({embeds: [
                    embed.setDesc("```js\n" + clean(output) + "\n```")
                ]});
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = inspect(err, { depth: 0 });
                }
                if (err.includes(message.client.token)) {
                    err = err.replace(message.client.token, "T0K3N");
                }
                message.reply({embeds: [
                    embed.setDesc("ERROR:\n```js\n" + clean(err) + "\n```")
                ]});
            });
    },
};
