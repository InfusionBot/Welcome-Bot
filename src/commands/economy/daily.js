/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const moment = require("moment");
require("moment-duration-format");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "daily",
                //aliases: ["day-coin"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: false,
                },
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, guildDB, userDB }, t) {
        const dailyCoins = 500;
        const lang = guildDB.lang ?? "en-US";
        const language = this.client.languages.find(
            (l) => l.name === lang || l.aliases.includes(lang)
        );
        moment.locale(language.moment);
        const multiplier =
            userDB.multiplier.daily === 0 ? 1 : userDB.multiplier.daily;
        const coins = dailyCoins * multiplier;

        const diff =
            24 * 60 * 60 * 1000 - (new Date().getTime() - userDB.daily);

        if (diff > 0) {
            const hours = Math.round(diff / (1000 * 60 * 60));
            let duration;
            if (hours == 24) {
                duration = moment.duration(hours, "hours");
            } else if (hours == 0) {
                const minutes = Math.ceil(diff / (1000 * 60));
                duration = moment.duration(minutes, "minutes");
            } else {
                duration = moment.duration(hours, "hours");
            }
            duration = duration.humanize();
            return message.reply(t("cmds:daily.dailyClaimed", { duration }));
        }

        try {
            userDB.wallet = Number(userDB.wallet) + coins;
            userDB.daily = new Date().getTime();
            userDB.multiplier.daily = userDB.multiplier.daily + 1;
            await userDB.save();
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: "green" })
            .setTitle(t("cmds:daily.cmdDesc"))
            .setDescription(t("cmds:daily.success", { wcoins: `${coins}` }))
            .setFooter(`${t("misc:multiplier")}: ${userDB.multiplier.daily}`);
        message.reply({ embeds: [embed] });
    }
};
