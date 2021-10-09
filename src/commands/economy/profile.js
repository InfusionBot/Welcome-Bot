/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getUser = require("../../db/functions/user/getUser");
const { userFromMention } = require("../../helpers/Util.js");
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

    async execute({ message, args, guildDB, userDB }, t) {
        moment.locale(guildDB.lang ? guildDB.lang.toLowerCase() : "en-us");
        const user = args[0]
            ? await this.getUserFromIdOrMention(args[0])
            : message.author;

        if (!user || user.bot) {
            message.reply(t("errors:invalidUser"));
            return false;
        }
        let userDB2;
        try {
            if (message.author.id !== user.id) userDB2 = await getUser(user.id);
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
            .setTitle(t("cmds:profile.title", { tag: user.tag }))
            .addField(
                t("cmds:balance.titleShort"),
                t("cmds:balance.bal", {
                    wallet,
                    bank,
                    bankLimit,
                    percentage: 100 - (bankLimit - bank) / 100,
                })
            )
            .addField(`:date: ${t("misc:accCreated")}`, accCreatedStr)
            .addField(`:ledger: ${t("misc:bio")}`, `${userDB2.bio}`)
            .addField(
                `:crown: ${t("misc:premium")}`,
                `${
                    this.client.codes.getCode(userDB?.premium?.code)
                        ? t("misc:yes")
                        : t("misc:no")
                }`
            );
        message.reply({ embeds: [embed] });
    }
};
