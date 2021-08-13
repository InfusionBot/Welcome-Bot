/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
const { Pagination } = require("djs-pagination-buttons");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "inventory",
                aliases: ["inv"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: false,
                },
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, guildDB, userDB }, t) {
        const items = Object.keys(userDB.inventory);
        const itemsThatGuyHas = items.filter((i) => userDB.inventory[i] > 0);
        if (!itemsThatGuyHas.length || itemsThatGuyHas.length <= 0)
            return message.reply(t("cmds:inventory.noItems"));
        const page = 0;
        const pages = [];
        const timeout = 200000; //20 secs timeout
        itemsThatGuyHas.forEach((item) => {
            const p = pages.length;
            pages[p] = new Embed({ color: "blue", timestamp: true });
            pages[p].setDesc(`${t("misc:inventory")}`);
            pages[p].addField(
                `\u200b`,
                `• ${userDB.inventory[item]} ${t(`misc:items.${item.toLowerCase()}`)}`
            );
        });
        const pagination = new Pagination(this.client, { timeout: timeout });
        pagination.setPages(pages);
        pagination.setAuthorizedUsers([message.author.id]);
        pagination.send(message);
    }
};
