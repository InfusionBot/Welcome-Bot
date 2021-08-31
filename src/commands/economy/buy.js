/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "buy",
                aliases: ["purchase"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Economy",
                slash: false,
            },
            client
        );
    }

    async execute({ message, args, userDB }, t) {
        if (!args[1]) args[1] = 1;
        if (isNaN(args[1])) return message.reply(t("errors:invalidNumber"));
        args[1] = parseInt(args[1]);
        args[0] = args[0].toLowerCase();
        if (!(this.client.shop.some(i => i.ids.includes(args[0])))) return message.reply(t("errors:invalidItem"));
        const [ itemName, amount ] = args;
        const item = this.client.shop.find(i => i.ids.includes(itemName));
        if (!item.sale) return message.reply(t("cmds:buy.notAvailable"));
        if (userDB.wallet < item.price) return message.reply(t("cmds:buy.noMoney"));
        userDB.wallet = userDB.wallet - item.price;
        userDB.markModified("wallet");
        if (!userDB.inventory[item.name]) userDB.inventory[item.name] = 0;
        userDB.inventory[item.name] = parseInt(userDB.inventory[item.name]) + amount;
        userDB.markModified(`inventory.${item.name}`);
        await userDB.save();
        message.reply(t("cmds:buy.done", {amount, item: itemName}));
    }

    async run({ interaction, userDB }, t) {
        return;
    }
};
