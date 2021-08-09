/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
const AsciiTable = require("ascii-table");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "shards",
                aliases: ["shard"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Core",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const embed = new Embed({ color: "success" }).setTitle(
            t("cmds:shards.cmdDesc")
        );
        const table = new AsciiTable()
            .setHeading(
                t("misc:shard"),
                t("misc:servers"),
                t("misc:cached_users"),
                t("misc:ping")
            )
            .setAlign(0, AsciiTable.CENTER)
            .setAlign(1, AsciiTable.CENTER)
            .setAlign(2, AsciiTable.CENTER)
            .setAlign(3, AsciiTable.CENTER)
            .removeBorder();
        const guildCount = await this.client.shard.fetchClientValues(
            "guilds.cache.size"
        );
        const users = await this.client.shard.fetchClientValues(
            "users.cache.size"
        );
        const ping = await this.client.shard.fetchClientValues("ws.ping");
        guildCount.forEach((count, shardId) => {
            table.addRow(
                `${shardId}`,
                `${count}`,
                `${users[shardId]}`,
                `${ping[shardId]}ms`
            );
        });
        embed.setDesc(`\`\`\`${table.toString()}\`\`\``);
        message.channel.send({
            embeds: [embed],
        });
    }
};
