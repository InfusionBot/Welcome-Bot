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
                requirements: {
                    guildOnly: true,
                    args: true,
                },
                disabled: false,
                cooldown: 30,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, userDB }, t) {
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
        if (userDB2.active.padlock) {
            userDB2.active.padlock = false;
            await userDB2.save();
            return message.reply(t("cmds:rob.padlock"));
        }
        let stolenCoins = Math.round(Math.floor(Math.random() * 400));
        let lostCoins = Math.round(Math.floor(Math.random() * 200));
        if (userDB2.wallet < 200) {
            return message.reply(
                t("cmds:rob.userNotEnoughMoney", { tag: user.tag })
            );
        }
        if (stolenCoins > 200 || lostCoins > 200) {
            stolenCoins = stolenCoins - 20;
            lostCoins = lostCoins + 20;
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
                    (!isNaN(parseInt(userDB.wallet))
                        ? parseInt(userDB.wallet)
                        : 0) - lostCoins
                );
            } else {
                userDB.wallet =
                    (!isNaN(parseInt(userDB.wallet))
                        ? parseInt(userDB.wallet)
                        : 0) + stolenCoins;
                userDB.markModified("wallet");
                await updateUser(
                    user.id,
                    "wallet",
                    (!isNaN(parseInt(userDB.wallet))
                        ? parseInt(userDB2.wallet)
                        : 0) - stolenCoins
                );
                await userDB.save();
            }
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: lost ? "error" : "success" })
            .setTitle(t("cmds:rob.cmdDesc"))
            .setDesc(result);
        message.reply({ embeds: [embed] });
    }
};
