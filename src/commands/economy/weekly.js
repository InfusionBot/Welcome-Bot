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
                name: "weekly",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    guildOnly: false,
                    premiumOnly: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Economy",
            },
            client
        );
    }

    async execute({ message, userDB, language }, t) {
        const weeklyCoins = 1e4; //10k
        moment.locale(language.moment);
        const multiplier =
            userDB.multiplier[this.name] === 0
                ? 1
                : userDB.multiplier[this.name];
        const coins = weeklyCoins * multiplier;

        const diff =
            7 * 24 * 60 * 60 * 1000 - (new Date().getTime() - userDB.weekly);

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
            userDB.weekly = new Date().getTime();
            userDB.multiplier[this.name] = userDB.multiplier[this.name] + 1;
            await userDB.save();
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: "green" })
            .setTitle(t("cmds:weekly.title"))
            .setDescription(t("cmds:daily.success", { wcoins: `${coins}` }))
            .setFooter(
                `${t("misc:multiplier")}: ${userDB.multiplier[this.name]}`
            );
        message.reply({ embeds: [embed] });
    }
};
