/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const fetch = require("node-fetch");
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
                usage: "[text]",
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const text = args.join(" ");
        if (!text) {
            return message.reply(t("cmds:hastebin.missingText"));
        }

        try {
            const res = await fetch("https://hastebin.com/documents", {
                method: "POST",
                body: text,
                headers: {
                    "Content-Type": "text/plain",
                    "User-Agent": process.env.userAgent,
                },
            });
            const json = await res.json();
            let url;
            if (json.key) {
                url = `https://hastebin.com/${json.key}.js`;
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
