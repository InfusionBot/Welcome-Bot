/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Pagination } = require("djs-pagination-buttons");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "shop",
                aliases: ["item", "items"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                },
                disabled: false,
                cooldown: 5,
                category: "Economy",
                slash: true,
            },
            client
        );
        this.timeout = 200000; //20 secs timeout
        this.getPages = (t) => {
            const pages = [];
            const { shop } = this.client;
            shop.each((item) => {
                const p = pages.length;
                const { name } = item;
                pages[p] = new Embed({ color: "blue", timestamp: true })
                    .setDesc(`${t("misc:shop")}`)
                    .addField(
                        `• ${t(`shop:${name}.name`)}`,
                        `IDs: ${item.ids.join(", ")}\n${t(`shop:${name}.desc`)}`
                    );
            });
        };
    }

    execute({ message, args }, t) {
        const { timeout } = this;
        const pages = this.getPages(t);
        const pagination = new Pagination(this.client, {
            buttons: {
                page: `${t("misc:page")} {{page}} / {{total_pages}}`,
            },
            timeout,
        });
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([message.author.id]);
        pagination.send(message.channel);
    }

    async run({ interaction }, t) {
        const { timeout } = this;
        const pages = this.getPages(t);
        const pagination = new Pagination(this.client, {
            buttons: {
                page: `${t("misc:page")} {{page}} / {{total_pages}}`,
            },
            timeout,
        });
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([interaction.user.id]);
        pagination.send(null, interaction);
    }
};
