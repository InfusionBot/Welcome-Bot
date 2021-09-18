/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "hastebin",
                aliases: ["pastebin"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const text = args.join(" ");
        let ext = "js"; //extension
        if (args[1] === "--extension") ext = args[2];
        if (!ext || typeof ext !== "string") {
            return message.reply(t("cmds:hastebin.invalidExt"));
        }
        if (!text) {
            return message.reply(t("cmds:hastebin.missingText"));
        }

        try {
            const json = await this.fetchJson(
                "https://hastebin.com/documents",
                {
                    method: "POST",
                    body: text,
                    headers: {
                        "Content-Type": "text/plain",
                        "User-Agent": process.env.userAgent,
                    },
                }
            );
            let url;
            if (json.key) {
                url = `https://hastebin.com/${json.key}.${ext}`;
            } else {
                throw new Error("Can't upload text to hastebin");
                return;
            }
            const embed = new Embed({
                color: "lightblue",
                tag: message.author.tag,
            })
                .setTitle(t("cmds:hastebin.title"))
                .setDesc(t("cmds:hastebin.success", { link: url }));
            return message.reply({ embeds: [embed] });
        } catch (e) {
            throw e;
        }
    }
};
