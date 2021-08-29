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

    async execute({ message, args, userDB }, t) {
        const user = args[0]
            ? await this.getUserFromIdOrMention(args[0])
            : message.author;
        if (!user || user.bot) {
            return message.reply(t("errors:invalidUser"));
        }
        let userDB2;
        try {
            if (message.author.id !== user.id)
                userDB2 = await client.userDbFuncs.getUser(user.id);
        } catch (e) {
            return message.reply(t("errors:noAcc"));
        }
        if (message.author.id === user.id) userDB2 = userDB;
        if (!userDB2 || typeof userDB2?.bankLimit !== "number") {
            return message.reply(t("errors:noAcc"));
        }
        const items = Object.keys(userDB2.inventory);
        const itemsThatGuyHas = items.filter((i) => userDB2.inventory[i] > 0);
        if (!itemsThatGuyHas.length || itemsThatGuyHas.length <= 0)
            return message.reply(t("cmds:inventory.noItems"));
        const pages = [];
        const timeout = 200000; //20 secs timeout
        itemsThatGuyHas.forEach((item) => {
            const p = pages.length;
            pages[p] = new Embed({ color: "blue", timestamp: true })
                .setDesc(`${t("misc:inventory")}`)
                .addField(
                    `• ${userDB2.inventory[item]} ${t(
                        `shop:${item.toLowerCase()}.name`
                    )}`,
                    `${t(`shop:${item.toLowerCase()}.desc`)}`
                );
        });
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
