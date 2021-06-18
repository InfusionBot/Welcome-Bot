/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "lib",
    aliases: ["library"],
    description: "Library used to build Welcome-Bot",
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        let embed = new MessageEmbed();
        embed.addField(
            "Discord.js v13 (master branch)",
            "We are opensource, you can check out source code at [GitHub](https://github.com/Welcome-Bot/welcome-bot)"
        );
        return message.reply(embed);
    },
};
