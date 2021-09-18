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
                name: "gift",
                aliases: [],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Economy",
                slash: false,
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message, args, userDB }, t) {
        const { getUser } = this.client.userDbFuncs;
        const user = await this.getUserFromIdOrMention(args[0]);
        if (!user || user.bot) {
            message.reply(t("errors:invalidUser"));
            return false;
        }
        if (user.id === message.author.id) {
            message.reply(t("cmds:gift.errorYourself"));
            return false;
        }
        const item = args[1] ? args[1].toLowerCase() : null;
        if (!item) {
            return message.reply(t("cmds:gift.noItem"));
        }
        const { shop } = this.client;
        if (!shop.get(item)) return message.reply(t("cmds:use.notAnItem"));
        const itemsThatGuyHas = Object.keys(userDB.inventory).filter(
            (i) => parseInt(userDB.inventory[i]) > 0
        );
        if (!itemsThatGuyHas.includes(args[0]))
            return message.reply(t("cmds:use.youDontHaveAny"));
        const amount = parseInt(args[2] ?? 1);
        if (isNaN(amount)) {
            return message.reply(t("errors:invalidNumber"));
        }
        if (parseInt(userDB.inventory[item]) <= amount) {
            return message.reply(t("cmds:use.tooMuch"));
        }
        let userDB2;
        try {
            userDB2 = await getUser(user.id);
        } catch (e) {
            return message.reply(t("errors:noAcc"));
        }
        if (typeof userDB2.bankLimit !== "number") {
            return message.reply(t("errors:noAcc"));
        }
        try {
            userDB.inventory[item] = userDB.inventory[item] - amount;
            userDB.markModified(`inventory.${item}`);
            await userDB.save();
            userDB2.inventory[item] = userDB2.inventory[item] + amount;
            userDB2.markModified(`inventory.${item}`);
            await userDB2.save();
        } catch (e) {
            message.client.logger.log(
                "Error occurred when donating wcoins",
                "error"
            );
            throw e;
        }
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(t("cmds:give.title", { user: user.username }))
            .setDesc(
                t("cmds:give.success", {
                    amount,
                    mention: `${message.author}`,
                    user: user.tag,
                    item,
                })
            );
        message.reply({ embeds: [embed] });
    }

    //eslint-disable-next-line no-unused-vars
    run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
