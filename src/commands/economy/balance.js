/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "balance",
                aliases: ["bal", "wallet"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, guildDB, userDB }, t) {
        const { wallet, bank, bankLimit } = userDB;
        let user;
        if (args[0]) {
            if (args[0].startsWith("<@")) {
                user = userFromMention(
                    args[0] || `${message.author}`,
                    message.client
                );
            }
            if (
                !isNaN(parseInt(args[0])) &&
                args[0] !== message.client.user.id
            ) {
                user = message.client.users.cache.get(args[0]);
                if (!user) user = await message.client.users.fetch(args[0]);
            }
        } else {
            user = message.author;
        }

        if (!user) {
            message.reply(t("errors:invalidUser"));
            return false;
        }
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(t("cmds:balance.balance", { user: user.username }))
            .setDesc(
                t("cmds:balance.bal", {
                    wallet,
                    bank,
                    bankLimit,
                    percentage: (bank + bankLimit) / 100,
                })
            );
        message.reply({ embeds: [embed] });
    }
};
