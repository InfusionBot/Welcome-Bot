/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
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
        if (message.channel.type !== "DM") {
            const botPerms = message.guild.me.permissionsIn(message.channel);
            if (!botPerms || !botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES))
                message
                    .reply(
                        `${t("errors:note")}: ${t(
                            "errors:iDontHavePermission",
                            {
                                permission: t("permissions:MANAGE_MESSAGES"),
                            }
                        )}, ${t("errors:pagination")}`
                    )
                    .then((msg) => {
                        setTimeout(() => {
                            msg.delete();
                        }, 5000);
                    });
        }
        const items = Object.keys(userDB.inventory);
        const itemsThatGuyHas = items.filter((i) => userDB.inventory[i] > 0);
        if (!itemsThatGuyHas.length || itemsThatGuyHas.length <= 0)
            return message.reply(t("cmds:inventory.noItems"));
        let page = 0;
        const pages = [new Embed({ color: "blue", timestamp: true })];
        const timeout = 200000; //20 secs timeout
        itemsThatGuyHas.forEach((item) => {
            const p = pages.length;
            pages[p] = new Embed({ color: "blue", timestamp: true });
            pages[p].addField(
                `${userDB.inventory[item]} ${t(
                    `misc:items.${item.toLowerCase()}`
                )}`
            );
        });
        const pagination = new Pagination(this.client, {timeout: timeout});
        pagination.setPages(pages);
        pagination.setChannel(message.channel);
        pagination.setAuthorizedUsers([message.author.id]);
        pagination.send();
    }
};
