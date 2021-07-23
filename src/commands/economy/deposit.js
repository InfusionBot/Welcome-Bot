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
        let wcoins = NaN;
        if (!isNaN(parseInt(args[0]))) {
            wcoins = parseInt(args[0]);
            if (wcoins > userDB.wallet) {
                return message.reply(t("cmds:deposit.notAvailable"));
            }
        } else if (
            args[0].toLowerCase() === "all" ||
            args[0].toLowerCase() === "max"
        ) {
            const freeSpace = userDB.bankLimit - userDB.bank;
            if (freeSpace > 0) {
                wcoins = userDB.wallet;
                if (wcoins < 0) {
                    //wcoins is a negetive integer
                    return message.reply(t("cmds:deposit.notAvailable"));
                } else if (wcoins > freeSpace) {
                    wcoins = wcoins - freeSpace;
                }
            } else if (freeSpace < 0) {
                //no free space
                return message.reply(t("cmds:deposit.noSpace"));
            }
        }
        try {
            await updateUser(
                message.author.id,
                "bank",
                parseInt(userDB.bank) + wcoins
            );
            await updateUser(
                message.author.id,
                "wallet",
                parseInt(userDB.wallet) - wcoins
            );
        } catch (e) {
            message.client.logger.log(
                "Error occurred when depositing user's wcoins",
                "error"
            );
            throw e;
        }
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(t("cmds:deposit.title"))
            .setDesc(
                t("cmds:deposit.success", {
                    wcoins,
                })
            );
        message.reply({ embeds: [embed] });
    }
};
