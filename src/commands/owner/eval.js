/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
/*eslint-disable no-unused-vars*/
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
                cooldown: 10,
                category: "Owner Only",
            },
            client
        );
    }

    execute({ message, args, guildDB, userDB, donator }, t) {
        const versionSender = require("../../functions/versionSender.js");
        const presence = require("../../functions/presence.js");
        const serverCount = require("../../functions/serverCount.js");
        const { inspect } = require("util");
        const { client } = this;
        const content = args.join(" ");
        const embed = new Embed({ color: "success" }).addField(
            "**Input**",
            "```js\n" + content + "\n```"
        );
        const result = new Promise((resolve) => resolve(eval(content)));
        if (!message || !message.channel) return;
        const clean = (text) => {
            if (typeof text === "string") {
                if (text.includes(message.client.token)) {
                    //Client token
                    text = text.replace(message.client.token, "T0K3N");
                }
                if (
                    message.client.config.dashboard.secret &&
                    text.includes(message.client.config.dashboard.secret)
                ) {
                    //Client secret
                    text = text.replace(
                        message.client.config.dashboard.secret,
                        "SECR3T"
                    );
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

    async giveCredits(userId, amount, message) {
        const userDB = await this.client.db
            .findOrCreateUser(userId)
            .catch(() => {});
        userDB.wallet = parseInt(userDB.wallet) + amount;
        userDB.markModified("wallet");
        await userDB.save();
        message.reply("Done");
    }
};
