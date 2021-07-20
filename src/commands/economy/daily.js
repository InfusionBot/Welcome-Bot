/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const updateUser = require("../../db/functions/user/updateUser");
const getUser = require("../../db/functions/user/getUser");
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

    async execute({ message, args, guildDB, userDB }, t) {
        const dailyCoins = 100;
        const time = new Date().getTime();
        const nextDaily = new Date().setTime(
            parseInt(userDB.dailyClaimed) - 24 * 60 * 60 * 1000
        );
        moment.locale(guildDB.lang ? guildDB.lang.toLowerCase() : "en-US");
        const momentTime = moment(nextDaily);
        const duration = moment
            .duration(moment(time).diff(nextDaily))
            .format(" D [days], H [hours]");
        if (time - parseInt(userDB.dailyClaimed) < 24 * 60 * 60 * 1000) {
            return message.reply(t("cmds:daily.dailyClaimed", { duration }));
        }

        try {
            await updateUser(
                message.author.id,
                "wallet",
                parseInt(userDB.wallet) + dailyCoins
            );
            await updateUser(message.author.id, "dailyClaimed", time);
        } catch (e) {
            throw e;
        }
        const embed = new Embed({ color: "green" })
            .setTitle(t("cmds:daily.cmdDesc"))
            .setDesc(t("cmds:daily.success", { wcoins: `${dailyCoins}` }));
        message.reply({ embeds: [embed] });
    }
};
