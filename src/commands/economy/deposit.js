/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const updateUser = require("../../db/functions/user/updateUser");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "deposit",
                aliases: ["dep", "bankdep"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                subcommands: [
                    {
                        name: "all",
                        desc: "Deposit maximum money, aliases: `max`",
                    },
                ],
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, guildDB, userDB }, t) {
        if (!(parseInt(userDB.wallet, 10) > 0)) {
            return message.reply(t("cmds:deposit.noMoney"));
        }
        if (userDB.bank === userDB.bankLimit) {
            return message.reply(t("cmds:deposit.noSpace"));
        }
        let amount = args[0];
        if (
            args[0].toLowerCase() === "all" ||
            args[0].toLowerCase() === "max"
        ) {
            amount = parseInt(userDB.wallet, 10);
            if (amount + userDB.bank > userDB.bankLimit) {
                amount = parseInt(userDB.bankLimit - userDB.bank, 10);
            }
        } else {
            if (isNaN(amount) || parseInt(amount, 10) < 1) {
                return message.reply(t("cmds:deposit.missingAmount"));
            }
            amount = parseInt(amount, 10);
        }
        if (userDB.wallet < amount) {
            return message.reply(t("cmds:deposit.notAvailable"));
        }
        try {
            userDB.bank =
                (!isNaN(parseInt(userDB.bank)) ? parseInt(userDB.bank) : 0) +
                amount;
            userDB.markModified("bank");
            userDB.wallet =
                (!isNaN(parseInt(userDB.bank)) ? parseInt(userDB.bank) : 0) -
                amount;
            userDB.markModified("wallet");
            await userDB.save();
        } catch (e) {
            message.client.logger.log(
                "Error occurred when depositing user's amount",
                "error"
            );
            throw e;
        }
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(t("cmds:deposit.title"))
            .setDesc(
                t("cmds:deposit.success", {
                    amount,
                })
            );
        message.reply({ embeds: [embed] });
    }
};
