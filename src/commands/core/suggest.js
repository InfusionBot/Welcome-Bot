/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed } = require("../../classes");
module.exports = {
    name: "suggest",
    //description: "Give your suggestion",
    args: true,
    usage: "[suggestion]",
    cooldown: 10,
    category: "Core",
    execute(message, args, guildDB, t) {
        const text = args.join(" ");
        let embed = new Embed({
            footer: `${message.author.tag} gave new suggestion!`,
            color: "success",
            timestamp: true,
        })
            .setTitle("New suggestion 🤔")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField(
                "From guild",
                `${message.guild.name} (${message.guild.id})`
            )
            .addField(
                "**Suggester:**",
                `<@${message.author.id}> (${message.author.id})`
            )
            .setDesc(text);
        try {
            message.client.channels.cache
                .get(message.client.suggestionLogsChannelId)
                .send({ embeds: [embed] })
                .then(async (msg) => {
                    await msg.react("👍");
                    await msg.react("👎");
                });
            message.react("👍");
            embed = new Embed({
                color: "green",
                footer: t("cmds:suggest.done"),
            }).addField(
                `[Welcome-Bot server](${message.client.supportGuildInvite})`,
                t("cmds:suggest.view")
            );
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            throw e;
        }
    },
};
