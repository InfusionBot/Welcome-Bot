/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { version } = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["bi", "binfo", "info"],
    //description: "Bot information",
    usage: "(--dm)",
    cooldown: 10,
    category: "Information",
    execute(message, args, guildDB) {
        const { MessageEmbed } = require("discord.js");
        let embed = new MessageEmbed()
            .setTitle(
                `${message.client.user.username} v${message.client.botVersion}`
            )
            .setDescription("Information and Support for Welcome-Bot")
            .setThumbnail("https://welcome-bot.github.io/assets/img/logo.png")
            .addField(
                ":pencil: General",
                `> Servers: ${message.client.guilds.cache.size} servers\n` +
                    `> Users: ${message.client.users.cache.size} users\n` +
                    `> Channels: ${message.client.channels.cache.size} channels\n` +
                    `> Version: ${message.client.botVersion}\n` +
                    `> Commands: ${message.client.commands.enabled.size} commands`
            )
            .addField(
                ":pencil: System",
                `> :gear: Node.js version: ${process.version}\n` +
                    `> :satellite: Discord.js version:${version}`
            )
            .addField(
                "👑 Bot owners",
                `Welcome-Bot was created by ${message.client.ownersTags.join(
                    ", "
                )}`
            )
            .addField(
                "🧾 Bot lists:",
                "> [discordextremelist.xyz](https://discordextremelist.xyz/en-US/bots/welcome-bot)\n" +
                    "> [disbotlist.xyz](https://disbotlist.xyz/bot/848459799783669790)\n" +
                    "> [dblist.xyz](https://dblist.xyz/bot/848459799783669790)\n" +
                    "> [discordservices.net](https://discordservices.net/bot/848459799783669790)\n" +
                    "> [discordlist.space](https://discordlist.space/bot/848459799783669790)\n" +
                    "> [discord.boats](https://discord.boats/bot/848459799783669790)\n"
            )
            .addField(
                "🔗 Other links:",
                "> [Support server](https://dsc.gg/welcome-bot-guild)\n" +
                    "> [GitHub](https://github.com/Welcome-Bot/welcome-bot/)\n" +
                    "> [Privacy policy](https://welcome-bot.github.io/docs/privacy-policy.md) and [Terms of service](https://welcome-bot.github.io/docs/terms.md)\n" +
                    "> [Documentation](https://welcome-bot.github.io/docs)"
            )
            .setImage(
                "https://welcome-bot.github.io/assets/img/graphics3-standard.gif"
            )
            .setColor("#33ddff");
        switch (args[0]) {
            case "--dm":
                message.author.send({ embeds: [embed] });
                message.channel.send(`Check out your DMs, ${message.author}`);
                break;
            default:
                message.channel.send({ embeds: [embed] });
                break;
        }
    },
};
