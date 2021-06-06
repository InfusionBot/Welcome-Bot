/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "info",
    aliases: ["debug", "stats"],
    description: "Statistics and Debug information",
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        let msg = new MessageEmbed();
        msg.setTitle("Info for Welcome bot");
        msg.setDescription("Statistics and Debug information also included");
        msg.setThumbnail("https://i.imgur.com/bbSlsT7.png");
        msg.addField("Servers joined:", message.client.guilds.cache.size);
        msg.addField("Version:", `${process.env.BOT_VER}`);
        msg.addField(
            "Bot lists:",
            `[discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/848459799783669790)`
        );
        msg.addField(
            "Other links:",
            "[Support server](https://discord.gg/xxU7akJNbC)\n" +
            "[GitHub](https://github.com/Welcome-Bot/welcome-bot/)\n" +
            "[Privacy policy](https://github.com/Welcome-Bot/welcome-bot/blob/main/docs/privacy-policy.md) and [Terms of service](https://github.com/Welcome-Bot/welcome-bot/blob/main/docs/terms.md)"
        );
        switch (args[0]) {
            case "--dm":
                message.author.send(msg);
                message.channel.send(`Check out your DMs ${message.author}`);
                break;
            default:
                message.channel.send(msg);
                break;
        }
    },
};
