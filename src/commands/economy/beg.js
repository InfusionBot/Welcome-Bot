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

    async execute({ message, args, guildDB, userDB }, t) {
        const begCoins = (20 * userDB.wallet) / userDB.bank;

        let wcoins =
            Math.floor(Math.random() * begCoins) > 1000
                ? begCoins - 1000
                : begCoins + 100;
        wcoins = Math.round(wcoins);
        let result;
        if (userDB.bank > 100) {
            wcoins = Math.round(Math.random() / userDB.wallet) * userDB.bank;
        }

        if (wcoins > 500) {
            wcoins = wcoins - Math.round(userDB.wallet - Math.random());
        } else if (wcoins > 100) {
            wcoins = wcoins + Math.round(userDB.wallet - Math.random());
        }

        if (wcoins > 500 && wcoins !== Infinity) {
            result = t("cmds:beg.chances.success", { wcoins });
        } else if (wcoins > 100 && wcoins !== Infinity) {
            result = t("cmds:beg.chances.little", { wcoins });
        } else if (wcoins < 0 || wcoins === Infinity || wcoins === NaN) {
            result = t("cmds:beg.chances.failed");
            wcoins = 0;
        } else {
            result = t("cmds:beg.chances.little", { wcoins });
        }

        try {
            await updateUser(
                message.author.id,
                "wallet",
                (parseInt(userDB.wallet) !== NaN
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
