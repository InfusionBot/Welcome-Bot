/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
const { Formatters, Collection } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "leaderboard",
                aliases: ["top-10"],
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
    async execute({ message, args, guildDB, userDB }, t) {
        const Users = await this.client.userSchema.find({});
        const array = Users.sort((a, b) => b.wallet - a.wallet).filter((user) =>
            this.client.users.cache.has(user.userId)
        );
        const collection = new Collection(array);
        const text = Formatters.codeBlock(
            collection
                .first(10)
                .map(
                    (user, position) =>
                        `• (${position + 1}) ${
                            this.client.users.cache.get(user.userId).tag
                        }: ${user.wallet}💰`
                )
                .join("\n")
        );
        const embed = new Embed().setDesc(text);
        message.reply({
            embeds: [embed],
        });
    }

    //eslint-disable-next-line no-unused-vars
    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
