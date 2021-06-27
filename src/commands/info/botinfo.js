/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "botinfo",
    aliases: ["botstats"],
    description: "Bot information",
    usage: "(--dm)",
    cooldown: 10,
    category: "Information",
    execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        let embed = new MessageEmbed()
            .setTitle("Welcome-Bot")
            .setDescription("Information and Support for Welcome-Bot")
            .setThumbnail("https://i.imgur.com/2BF9mxi.png")
            .addField("Servers joined:", `${message.client.guilds.cache.size}`)
            .addField("Version:", `${message.client.botVersion}`)
            .addField("No of Commands:", `${message.client.commands.size}`)
            .addField(
                "The no of channels bot is currently handling:",
                `${message.client.channels.cache.size}`
            )
            .addField(
                "👑 Bot owners",
                `Welcome-Bot was created by ${message.client.ownersTags.join(
                    ", "
                )}`
            )
            .addField(
                "Invite URL:",
                "[Without moderation feature](https://dsc.gg/welcome-bot2) OR [With moderation feature](https://dsc.gg/welcome-bot)"
            )
            .addField(
                "Bot lists:",
                `[discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/welcome-bot)\n` +
                    `[disbotlist.xyz](https://disbotlist.xyz/bot/848459799783669790)`
            )
            .addField(
                "Other links:",
                "[Support server](https://dsc.gg/welcome-bot-guild)\n" +
                    "[GitHub](https://github.com/Welcome-Bot/welcome-bot/)\n" +
                    "[Privacy policy](https://welcome-bot.github.io/docs/privacy-policy.md) and [Terms of service](https://welcome-bot.github.io/docs/terms.md)\n" +
                    "[Documentation](https://welcome-bot.github.io/docs)"
            )
            .setImage("https://i.imgur.com/FwVH77A.gif");
        switch (args[0]) {
            case "--dm":
                message.author.send({ embeds: [embed] });
                message.channel.send(`Check out your DMs ${message.author}`);
                break;
            default:
                message.channel.send({ embeds: [embed] });
                break;
        }
    },
};
