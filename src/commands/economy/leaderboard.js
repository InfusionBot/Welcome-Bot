/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Formatters } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "leaderboard",
                aliases: ["top-10", "rich", "richest"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Economy",
                slash: false,
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    async execute({ message }, t) {
        const Users = await this.client.userSchema.find({});
        let array = Users.sort((a, b) => b.wallet - a.wallet).filter((user) =>
            this.client.users.cache.has(user.userId)
        );
        if (message.guild)
            array = array.filter((user) =>
                message.guild.members.cache.has(user.id)
            );
        const text = Formatters.codeBlock(
            array
                .slice(0, 10)
                .map(
                    (user /*, position*/) =>
                        `• ${this.client.users.cache.get(user.userId).tag}: ${
                            user.wallet
                        }💰`
                )
                .join("\n")
        );
        message.reply({
            content: text,
        });
    }

    //eslint-disable-next-line no-unused-vars
    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
