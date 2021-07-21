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
                name: "withdraw",
                aliases: ["wd"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                subcommands: [
                    {
                        name: "all",
                        desc: "Withdraw all amount from bank: `max`",
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
            if (wcoins > userDB.bank) {
                return message.reply(t("cmds:withdraw.notAvailable"));
            }
        } else if (
            args[0].toLowerCase() === "all" ||
            args[0].toLowerCase() === "max"
        ) {
            wcoins = userDB.bank;
        }
        try {
            await updateUser(
                message.author.id,
                "wallet",
                parseInt(userDB.wallet) + wcoins
            );
            await updateUser(
                message.author.id,
                "bank",
                parseInt(userDB.bank) - wcoins
            );
        } catch (e) {
            message.client.logger.log(
                "Error occurred when withdrawing user's wcoins",
                "error"
            );
            throw e;
        }
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(t("cmds:withdraw.title"))
            .setDesc(
                t("cmds:withdraw.success", {
                    wcoins,
                })
            );
        message.reply({ embeds: [embed] });
    }
};
