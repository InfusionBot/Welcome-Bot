/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const getGuild = require("../db/functions/guild/getGuild");
const { nth } = require("../helpers/Util.js");
const { Embed } = require("../classes");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text) => {
    const context = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return context.font;
};
module.exports = async (member) => {
    const guildDB = await getGuild(member.guild.id);
    if (
        !guildDB.plugins.welcome.enabled ||
        guildDB.disabled.includes("welcome")
    )
        return "disabled";
    let channel;
    if (isNaN(guildDB.plugins.welcome.channel)) {
        channel = member.guild.channels.cache.find(
            (ch) => ch.name === guildDB.plugins.welcome.channel
        );
    } else {
        channel = member.guild.channels.cache.find(
            (ch) => ch.id === guildDB.plugins.welcome.channel
        );
    }
    if (!channel) {
        return "channelNotFound";
    }
    channel.sendTyping();

    const canvas = Canvas.createCanvas(1024, 450);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(__dirname + "/../assets/img/welcome_bg.jpg");

    // Draw the background image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set the color of the stroke
    ctx.strokeStyle = "#0099ff";

    // Draw a rectangle with the dimensions of the entire canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Add a text "Welcome!" in the top
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Welcome!", canvas.width / 2.5, canvas.height / 3.5);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));

    // Move the image downwards vertically and constrain its height to 200, so that it's square
    ctx.drawImage(avatar, 25, 25, 200, 200);

    // Make the avatar circle
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Add the user's tag in the center
    ctx.font = applyText(canvas, `${member.user.tag}`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(member.user.tag, canvas.width / 2.5, canvas.height / 1.8);

    const attachment = new MessageAttachment(canvas.toBuffer(), `welcome-${member.user.tag}.png`);
    let msg = guildDB.plugins.welcome.message;
    //Replace Placeholders with their values
    msg = msg
        .replace("{mention}", `${member}`)
        .replace("{tag}", `${member.user.tag}`)
        .replace("{username}", `${member.user.username}`)
        .replace("{server}", `${member.guild.name}`)
        .replace("{members}", `${member.guild.memberCount}`)
        .replace(
            "{members_formatted}",
            `${member.guild.memberCount}${nth(member.guild.memberCount)}`
        );
    const embed = new Embed({ color: "blue" })
        .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({
                size: 512,
                dynamic: true,
                format: "png",
            })
        )
        .setTitle(`Welcome ${member.user.tag}!`)
        .setDescription(msg)
        .setFooter(`Total members: ${member.guild.memberCount}`);
    const sent = await channel
        .send({
            content: `${member.user}`,
            embeds: [embed],
            files: [attachment],
        })
        .catch(() => {});
    return sent;
};
