/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const moment = require("moment");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "profile",
                aliases: ["user-profile", "account"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 5,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, args, userDB, language, donator }, t) {
        moment.locale(language.moment);
        const user = args[0]
            ? await this.getUserFromIdOrMention(args[0])
            : message.author;

        if (!user || user.bot) {
            message.reply(t("errors:invalidUser"));
            return false;
        }
        let userDB2;
        try {
            if (message.author.id !== user.id)
                userDB2 = await this.client.models.User.findOne({
                    userId: user.id,
                });
        } catch (e) {
            return message.reply(t("errors:noAcc"));
        }
        if (message.author.id === user.id) userDB2 = userDB;
        const { wallet, bank, bankLimit } = userDB2;
        if (typeof bankLimit !== "number") {
            return message.reply(t("errors:noAcc"));
        }
        const accCreated = new Date(userDB2.registeredAt);
        const accCreatedStr = moment(accCreated).toString();
        const embed = new Embed({ color: "lightblue", timestamp: true })
            .setTitle(
                t("cmds:profile.title", { tag: user.tag }) +
                    `${donator ? ":star:" : ""}`
            )
            .addField(
                t("cmds:balance.titleShort"),
                t("cmds:balance.bal", {
                    wallet: Number(wallet).toLocaleString(
                        userDB.locale == "null" ? "en-US" : userDB.locale
                    ),
                    bank: Number(bank).toLocaleString(
                        userDB.locale == "null" ? "en-US" : userDB.locale
                    ),
                    bankLimit: Number(bankLimit).toLocaleString(
                        userDB.locale == "null" ? "en-US" : userDB.locale
                    ),
                    percentage: Number(100 - (bankLimit - bank) / 100).toFixed(
                        2
                    ),
                })
            )
            .addField(`:date: ${t("misc:accCreated")}`, accCreatedStr)
            .addField(`:ledger: ${t("misc:bio")}`, `${userDB2.bio}`)
            .addField(
                `:star: ${t("misc:premium")}`,
                `${donator ? t("misc:yes") : t("misc:no")}`
            );
        message.reply({ embeds: [embed] });
    }
};
