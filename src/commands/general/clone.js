/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Permissions } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "clone",
                aliases: ["copy"],
                memberPerms: [],
                botPerms: [Permissions.FLAGS.MANAGE_WEBHOOKS],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
                slash: true,
                options: [
                    {
                        name: "text",
                        description: "The text you want to clone",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const text = args.join(" ");
        const { author: user } = message;
        const webhook = await message.channel.createWebhook(user.username, {
            avatar: user.displayAvatarURL(),
        });
        if (message.deletable) message.delete();
        await webhook.send({
            content: text,
        });
        await webhook.delete();
    }

    async run({ interaction }, t) {
        const text = interaction.options.getString("text");
        const { user } = interaction;
        const webhook = await interaction.channel.createWebhook(user.username, {
            avatar: user.displayAvatarURL(),
        });
        await webhook.send({
            content: text,
        });
        await webhook.delete();
    }
};
