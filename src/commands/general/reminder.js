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
                name: "reminder",
                aliases: ["remind-me"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 5,
                category: "General",
                slash: true,
                options: [
                    {
                        name: "time",
                        description: "After how much time should i remind you? Example: 1min",
                        type: "STRING",
                        required: true,
                    },
                    {
                        name: "text",
                        description: "For what should I remind you?",
                        type: "STRING",
                        required: false,
                    },
                ],
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args }, t) {
        const time = require("ms")(args[0]);
        const text = args[1] ?? "No text provided";
        const { channel, author } = message;
        setTimeout(() => {
            channel.send(
                t("cmds:reminder.remind", { user: `${author}`, text })
            );
        }, time);
        message.reply(t("cmds:reminder.set"));
    }

    //eslint-disable-next-line no-unused-vars
    run({ interaction }, t) {
        const time = require("ms")(interaction.options.getString("time"));
        const text = interaction.options.getString("text") ?? "No text provided";
        const { channel, user } = interaction;
        setTimeout(() => {
            channel.send(
                t("cmds:reminder.remind", { user: `${user}`, text })
            );
        }, time);
        interaction.folloUp(t("cmds:reminder.set"));
    }
};
