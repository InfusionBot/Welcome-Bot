/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const moment = require("moment");
require("moment-duration-format");
const { Embed } = require("../../classes");
module.exports = {
    name: "uptime",
    aliases: ["botuptime"],
    //description: "Get uptime of the bot",
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB, t) {
        moment.locale(guildDB.lang.toLowerCase());
        const duration = moment
            .duration(message.client.uptime)
            .format(" D [days], H [hours], m [minutes], s [seconds]");
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(message.client.uptime);
        const embed = new Embed({
            color: "green",
            timestamp: true,
            footer: t("cmds:uptime.cmdDesc"),
        })
            .setTitle(`:hourglass_flowing_sand: ${t("misc:uptime")}`)
            .addField(
                `<:online:860920786382880809> ${t("misc:uptime")}`,
                `\`\`\`${duration}\`\`\``
            )
            .addField(
                t("misc:date-launched"),
                `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``
            );
        message.channel.send({
            embeds: [embed],
        });
    },
};
