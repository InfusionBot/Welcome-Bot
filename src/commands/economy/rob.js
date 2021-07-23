/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { userFromMention } = require("../../helpers/Util.js");
const getUser = require("../../db/functions/user/getUser");
const updateUser = require("../../db/functions/user/updateUser");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "rob",
                memberPerms: [],
                botPerms: [],
                usage: "[@mention / user id]",
                requirements: {
                    guildOnly: true,
                    args: true,
                },
                disabled: false,
                cooldown: 60,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, guildDB, userDB }, t) {
        if (userDB.wallet < 200) {
            this.removeCooldown(message.author);
            return message.reply(t("cmds:rob.notEnoughMoney"));
        }
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (!isNaN(parseInt(args[0]))) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        } else {
            user = message.author;
        }

        if (!user || user.bot) {
            message.reply(t("errors:invalidUser"));
            this.removeCooldown(message.author);
            return false;
        }
        let userDB2;
        try {
            userDB2 = await getUser(user.id);
        } catch (e) {
            return message.reply(t("errors:noAcc"));
        }
        if (typeof userDB2.bankLimit !== "number") {
            this.removeCooldown(message.author);
            return message.reply(t("errors:noAcc"));
        }
        let stolenCoins = Math.round(Math.floor(Math.random() * 200));
        let lostCoins = Math.round(Math.floor(Math.random() * 100));
        if (userDB2.wallet < 200) {
            return message.reply(
                t("cmds:rob.userNotEnoughMoney", { tag: user.tag })
            );
        }
        if (stolenCoins > 100 || lostCoins > 100) {
            stolenCoins = stolenCoins - 10;
            lostCoins = lostCoins + 10;
        } else if (stolenCoins >= 50 || lostCoins >= 50) {
            stolenCoins = 0;
            lostCoins = 50;
        }
        let lost = false;
        if (Math.random() * 20 < 15 || stolenCoins <= 0) {
            lost = true;
        }
        let result;
        if (!lost)
            result = t("cmds:rob.success", { stolenCoins, tag: user.tag });
        else result = t("cmds:rob.failed", { lostCoins });

        try {
            if (lost) {
                await updateUser(
                    message.author.id,
                    "wallet",
                    (parseInt(userDB.wallet) !== NaN
                        ? parseInt(userDB.wallet)
                        : 0) - lostCoins
                );
            } else {
                await updateUser(
                    message.author.id,
                    "wallet",
                    (parseInt(userDB.wallet) !== NaN
                        ? parseInt(userDB.wallet)
                        : 0) + stolenCoins
                );
                await updateUser(
                    user.id,
                    "wallet",
                    (parseInt(userDB2.wallet) !== NaN
                        ? parseInt(userDB2.wallet)
                        : 0) - stolenCoins
                );
            }
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: lost ? "error" : "success" })
            .setTitle(t("cmds:rob.cmdDesc"))
            .setDesc(result);
        message.reply({ content: `${user}`, embeds: [embed] });
    }
};
