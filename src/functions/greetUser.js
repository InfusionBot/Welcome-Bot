/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/getGuild");
const genImage = require("./genImage");
const fs = require("fs");
module.exports = async (member) => {
    const { MessageAttachment } = require("discord.js");
    let guildDB = await getGuild(member.guild.id);
    let channel = member.guild.channels.cache.find(
        (ch) => ch.name === guildDB.channel
    );
    let image;
    genImage(member)
        .then((img) => {
            image = img;
        })
        .catch((err) => {
            console.log(err);
        });
    if (!channel) {
        return;
    }
    channel.startTyping(1);
    let msg = guildDB.welcomeMessage;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`);
    if (image) {
        let attachment = new MessageAttachment(
            Buffer.from(image, "utf-8"),
            "welcome-image.jpg"
        );
        channel.send(msg, attachment);
    } else {
        channel.send(msg);
        console.error("Can't get welcome image");
    }
    channel.stopTyping();
};
