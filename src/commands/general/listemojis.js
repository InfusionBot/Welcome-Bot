/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "listemojis",
                aliases: ["list-emojis"],
                memberPerms: [],
                //botPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
                requirements: {
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    async execute({ message }, t) {
        const pages = [];
        let i0 = 0; //From
        let i1 = 10; //To
        const timeout = 200000; //20 secs timeout
        const emojis = message.guild.emojis.cache.size;
        const getList = () => {
            return message.guild.emojis.cache
                .map((e, x) => `• ${e.name} (${x})`)
                .slice(i0, i1)
                .join("\n");
        };
        for (let i = 0; i < emojis;) {
            const embed = new Embed({ timestamp: true })
                .setTitle(
                    t("cmds:listemojis.cmdDesc")
                )
                .setDesc(getList());
            const p = pages.length;
            pages[p] = embed;
            i = i + 10;
            i0 = i0 + 10;
            i1 = i1 + 10;
            if (i1 > emojis + 10) {
                break;
            }
            if (!i0 || !i1) {
                delete pages[p];
                break;
            }
        }
        const pagination = new Pagination(this.client, {
            timeout: timeout,
        });
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([message.author.id]);
        pagination.send(message);
    }
};
