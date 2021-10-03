/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { nth } = require("../helpers/Util.js");
//const { Embed } = require("../classes");
const { MessageAttachment } = require("discord.js");
const { resolve } = require("path");
const Canvas = require("canvas");
Canvas.registerFont(resolve(__dirname + "/../assets/fonts/theboldfont.ttf"), {
    family: "Bold",
});
Canvas.registerFont(
    resolve(__dirname + "/../assets/fonts/JosefinSans-Bold.ttf"),
    { family: "JosefinSans" }
);
// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text, fontSize = 60, font = "Bold") => {
    const context = canvas.getContext("2d");

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${(fontSize -= 10)}px ${font}`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return context.font;
};
module.exports = async (member) => {
    try {
        const { client } = member;
        const guildDB = await client.db.models.Guild.findOne({ guildId: member.guild.id });
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
            channel = await member.guild.channels.fetch(
                guildDB.plugins.welcome.channel
            );
        }
        if (!channel) {
            return "channelNotFound";
        }
        channel.sendTyping();
        const t = client.i18next.getFixedT(guildDB.lang ?? "en-US");

        const canvas = Canvas.createCanvas(1024, 450);
        const ctx = canvas.getContext("2d");

        // Draw the background image
        const background = await Canvas.loadImage(
            __dirname + "/../assets/img/welcome_bg.jpg"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw a rectangle with the dimensions of the entire canvas
        ctx.strokeStyle = "#0099ff";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Add a text "Welcome!" in the top
        const welcome = t("misc:welcome");
        ctx.font = applyText(canvas, welcome, 40);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(welcome, canvas.width / 2.5, canvas.height / 3.5);

        // Add the user's tag in the center
        ctx.font = applyText(canvas, `${member.user.tag}`, 60, "JosefinSans");
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
            `${member.user.tag}`,
            canvas.width / 2.5,
            canvas.height / 1.8
        );

        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Draw the user's avatar
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: "jpg", size: 512 })
        );
        ctx.drawImage(avatar, 100, 100, 200, 200);

        const attachment = new MessageAttachment(
            canvas.toBuffer(),
            `welcome-${member.user.tag}.png`
        );
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
        const sent = await channel.send({
            content: msg,
            files: [attachment],
        });
        return sent;
    } catch (e) {
        return e;
    }
};
