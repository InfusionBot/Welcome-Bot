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
                cooldown: 30,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, guildDB, userDB }, t) {
        let begCoins = 20;

        let wcoins = Math.floor(Math.random() * begCoins) > 100 ? begCoins - 10 : begCoins + 10;
        console.log(wcoins);
        let result;
        if (wcoins > 50) {
            wcoins = wcoins + Math.floor(Math.random());
            result = t("cmds:beg.chances.success", {wcoins});
        } else if (wcoins > 10) {
            wcoins = wcoins - Math.floor(Math.random());
            result = t("cmds:beg.chances.little", {wcoins});
        } else {
            result = t("cmds:beg.chances.failed");
            wcoins = 0;
        }

        try {
            await updateUser(
                message.author.id,
                "wallet",
                parseInt(userDB.wallet) + wcoins
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
