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
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "eval",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    ownerOnly: true,
                },
                usage: "[statement]",
                disabled: false,
                cooldown: 20,
                category: "Owner Only",
            },
            client
        );
    }

    execute({ message, args, guildDB, userDB }, t) {
        const client = message.client;
        const content = args.join(" ");
        const embed = new Embed({ color: "success" })
            .setTitle(t("cmds:eval.cmdDesc"))
            .addField("**Input**", "```js\n" + content + "\n```");
        const result = new Promise((resolve) => resolve(eval(content)));
        const clean = (text) => {
            if (typeof text === "string") {
                if (text.includes(message.client.token)) {
                    text = text.replace(message.client.token, "T0K3N");
                }
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            } else {
                return text;
            }
        };

        return result
            .then((output) => {
                const type = typeof output;
                if (typeof output !== "string") {
                    output = inspect(output, { depth: 0 }); //depth should be 0 as it will give contents of object in a property, in this object. That makes the message too long.
                }

                message.reply({
                    embeds: [
                        embed
                            .setDesc("```js\n" + clean(output) + "\n```")
                            .addField("**Type**", type),
                    ],
                });
            })
            .catch((err) => {
                if (typeof err !== "string") {
                    err = inspect(err, { depth: 0 });
                }

                message.reply({
                    embeds: [
                        embed.setDesc("ERROR:\n```js\n" + clean(err) + "\n```"),
                    ],
                });
            });
    }
};
