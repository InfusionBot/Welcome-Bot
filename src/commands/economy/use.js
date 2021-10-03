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
                name: "use",
                aliases: ["equip", "consume"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Economy",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, userDB }, t) {
        const items = Object.keys(userDB.inventory);
        args[0] = args[0].toLowerCase();
        if (
            !this.client.shop.some(
                (i) => i.ids.includes(args[0]) && i.usable
            ) ||
            !items.includes(args[0])
        )
            return message.reply(t("cmds:use.notAnItem"));
        args[0] = this.client.shop.find((i) => i.ids.includes(args[0])).name;
        const itemsThatGuyHas = items.filter(
            (i) => parseInt(userDB.inventory[i]) > 0
        );
        if (!itemsThatGuyHas.includes(args[0]))
            return message.reply(t("cmds:use.youDontHaveAny"));
        if (!args[1]) args[1] = 1;
        const [item, count] = args;
        if (parseInt(userDB.inventory[item]) < parseInt(count))
            return message.reply(t("cmds:use.tooMuch", { item, count }));
        userDB.inventory[item] = userDB.inventory[item] - count;
        userDB.markModified(`inventory.${item}`);
        let metadata;
        switch (item) {
            case "banknote":
                userDB.bankLimit = userDB.bankLimit + 100 * count;
                metadata = t("cmds:use.banknote", { added: 100 * count });
                break;
            case "padlock":
                userDB.active.padlock = true;
                metadata = t("cmds:use.padlock");
                break;
            default:
                throw new Error(
                    `${item} was tried to be used by ${message.author.tag} (${message.author.id}), but no method was found to implement`
                );
                break;
        }
        await userDB.save();
        message.channel.send(t("cmds:use.used", { item, count, metadata }));
    }
};
