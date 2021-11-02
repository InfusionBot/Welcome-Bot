/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
const { Pagination } = require("djs-pagination-buttons");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "servers-list",
                aliases: ["slist"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    ownerOnly: true,
                },
                disabled: false,
                cooldown: 20,
                category: "Owner Only",
            },
            client
        );
    }

    async execute({ message }, t) {
        let guilds = message.client.guilds.cache;
        if (this.client.shard) {
            const allGuilds = await this.client.shard.fetchClientValues(
                "guilds.cache"
            );
            guilds = [].concat(...allGuilds);
        }
        const pages = [];
        let i0 = 0; //From
        let i1 = 10; //To
        const timeout = 200000; //20 secs timeout
        const getList = () => {
            return guilds
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(
                    (r, i) =>
                        `**${i + 1}** - ${r.name} | ${r.memberCount} members`
                )
                .slice(i0, i1)
                .join("\n");
        };
        for (let i = 0; i < guilds.size; ) {
            const p = pages.length;
            const embed = new Embed({ timestamp: true })
                .setTitle(`Page: ${p + 1} / ${Math.ceil(guilds.size / 10)}`)
                .setDesc(`Servers: ${guilds.size}\n\n` + getList());
            pages[p] = embed;
            i = i + 10;
            i0 = i0 + 10;
            i1 = i1 + 10;
            if (i1 > guilds.size + 10) {
                break;
            }
            if (!i0 || !i1) {
                delete pages[p];
                break;
            }
        }
        const pagination = new Pagination(this.client, {
            buttons: {
                page: `${t("misc:page")} {{page}} / {{total_pages}}`,
            },
            timeout: timeout,
        });
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([message.author.id]);
        pagination.send(message.channel);
    }
};
