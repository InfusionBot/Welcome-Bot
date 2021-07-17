/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const moment = require("moment");
require("moment-duration-format");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor (client) {
        super({
            name: "uptime",
            aliases: ["bot-uptime"],
            memberPerms: [],
            botPerms: [],
            disabled: false,
            cooldown: 10,
            category: "Core",
        }, client);
    }

    execute ({message, args}, t) {
        moment.locale(guildDB.lang.toLowerCase());
        const duration = moment
            .duration(message.client.uptime)
            .format(" D [days], H [hours], m [minutes], s [seconds]");
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(message.client.uptime);
        const embed = new Embed({
            color: "green",
            timestamp: true,
        })
            .setTitle(`:hourglass_flowing_sand:`)
            .addField(
                `${message.client.customEmojis.online} ${t("misc:uptime")}`,
                `\`\`\`${duration}\`\`\``
            )
            .addField(
                t("misc:datelaunched"),
                `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``
            );
        message.channel.send({
            embeds: [embed],
        });
    }
};
