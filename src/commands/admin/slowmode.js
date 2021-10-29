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
                name: "slowmode",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                    guildOnly: true,
                },
                disabled: false,
                cooldown: 5,
                category: "Administrator",
                slash: true,
                options: [
                    {
                        name: "limit",
                        description:
                            "How much time do you want to set the slowmode to? Examples: 1h, 2m, 5s",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            client
        );
    }

    execute({ message, args }, t) {
        const seconds = this.seconds(args[0]);
        message.channel.setRateLimitPerUser(seconds);
        message.channel.send(t("cmds:slowmode.content"), { seconds });
    }

    async run({ interaction }, t) {
        const seconds = this.seconds(interaction.options.getString("limit"));
        interaction.channel.setRateLimitPerUser(seconds);
        interaction.followUp({
            content: t("cmds:slowmode.content", { seconds }),
            ephermal: true,
        });
    }

    seconds(limit) {
        return require("ms")(limit) / 1000;
    }
};
