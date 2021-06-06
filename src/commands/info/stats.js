/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "stats",
    //aliases: [],
    description: "Your server statistics",
    usage: "(--dm)",
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");
        let msg = new MessageEmbed();
        msg.setTitle("Statistics");
        msg.setDescription(`Statistics for ${message.guild.name} server`);
        //https://discord.js.org/#/docs/main/v12/class/Guild?scrollTo=iconURL
        msg.setThumbnail(message.guild.iconURL());
        msg.addField("Members joined in your server:", message.guild.memberCount);
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
