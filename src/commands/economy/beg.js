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
                name: "beg",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: false,
                },
                disabled: false,
                cooldown: 60,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, userDB, donator }, t) {
        const begCoins =
            150 * (donator ? this.client.config.donorMultiplier : 1);

        let wcoins = Math.floor(Math.random() * begCoins) + 1;
        wcoins = Math.round(wcoins);
        let result;

        if (wcoins === Infinity) {
            wcoins = Math.floor(Math.random() * (begCoins - 100)) + 1;
        }

        if (wcoins > 50 && wcoins !== Infinity) {
            result = t("cmds:beg.chances.success", { wcoins });
        } else if (wcoins < 0 || isNaN(wcoins) || wcoins === Infinity) {
            result = t("cmds:beg.chances.failed");
            wcoins = 0;
        } else if (wcoins !== Infinity) {
            result = t("cmds:beg.chances.little", { wcoins });
        }

        try {
            await updateUser(
                message.author.id,
                "wallet",
                (!isNaN(parseInt(userDB.wallet))
                    ? parseInt(userDB.wallet)
                    : 0) + wcoins
            );
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: "blue" })
            .setTitle(t("cmds:beg.cmdDesc"))
            .setDesc(result);
        message.reply({ embeds: [embed] });
    }
};
