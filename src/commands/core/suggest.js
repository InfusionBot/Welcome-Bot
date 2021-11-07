/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "suggest",
                aliases: ["suggestion"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "Core",
            },
            client
        );
    }

    execute({ message, args }, t) {
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
                .get(message.client.config.channels.suggestionLogs)
                .send({ embeds: [embed] })
                .then(async (msg) => {
                    await msg.react("👍");
                    await msg.react("👎");
                });
            message.react("👍");
            embed = new Embed({
                color: "green",
                footer: t("cmds:suggest.done"),
            })
                .setTitle(`Join the ${this.client.username} community server`)
                .setURL(message.client.config.supportGuildInvite)
                .setDesc(
                    t("cmds:suggest.view", {
                        chanid: message.client.config.channels.suggestionLogs,
                    })
                );
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            throw e;
        }
    }
};
