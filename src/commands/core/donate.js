/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "donate",
                aliases: ["premium"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 5,
                category: "Core",
                slash: true,
            },
            client
        );
        this.donateLink = `https://donatebot.io/checkout/${this.client.config.servers.main}`;
    }

    execute({ message }, t) {
        const embed = new Embed({ color: "success" })
            .setTitle(t("cmds:donate.title"))
            .setDescription(
                t("cmds:donate.description", {
                    link: `${this.donateLink}?buyer=${encodeURIComponent(
                        message.author.id
                    )}&id=`,
                    ...this.client.config.roles.donators,
                })
            );
        message.channel.send({ embeds: [embed] });
    }

    async run({ interaction }, t) {
        const embed = new Embed({ color: "success" })
            .setTitle(t("cmds:donate.title"))
            .setDescription(
                t("cmds:donate.description", {
                    link: `${this.donateLink}?buyer=${encodeURIComponent(
                        interaction.user.id
                    )}&id=`,
                    ...this.client.config.roles.donators,
                })
            );
        interaction.followUp({ embeds: [embed] });
    }
};
