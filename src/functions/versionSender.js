/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
    let reply = "";
    client.package.changelog.forEach((change) => {
        if (change.startsWith("**")) {
            reply += `\n${change}`;
        } else {
            reply += `\n- ${change}`;
        }
    });
    const embed = new MessageEmbed()
        .setTitle(`New Version: **${client.package.version}**`)
        .setDescription(reply)
        .setColor("DARK_GOLD")
        .setAuthor(client.user.tag, client.user.displayAvatarURL());
    if (
        process.env.NODE_ENV === "production" &&
        client.package.version.indexOf("dev") === -1
    ) {
        const newsChannel = client.channels.cache.get(
            client.config.channels?.newsChannel
        );
        if (newsChannel) newsChannel.send({ embeds: [embed] });
        else
            client.logger.log(
                "No News Channel found to send version updates",
                "error"
            );
    }
    if (client.debug) client.logger.log("Version updated", "debug");
};
