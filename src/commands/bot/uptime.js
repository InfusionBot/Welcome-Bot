/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "uptime",
    aliases: ["getuptime"],
    description: "Get uptime of the bot",
    cooldown: 10,
    execute(message, args) {
        //https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=uptime
        let totalSeconds = client.uptime / 1000; //1000 ms = 1 sec
        const days = Math.floor(totalSeconds / 86400); //total seconds divided by 86400 to get days
        totalSeconds %= 86400; //Get remainder of totalSeconds and 86400 (by division) and stores result in totalSeconds
        const hours = Math.floor(totalSeconds / 3600); //total seconds divided by 3600 to get hours
        totalSeconds %= 3600; //Get remainder of totalSeconds and 3600 (by division) and stores result in totalSeconds
        const minutes = Math.floor(totalSeconds / 60); //total seconds divided by 60 to get minutes
        const seconds = Math.floor(totalSeconds % 60); //total seconds divided by 60 to get seconds
        return message.channel.send(
            `Uptime of the bot: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
        );
    },
};
