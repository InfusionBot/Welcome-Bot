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
                disabled: true,
                cooldown: 5,
                category: "General",
                slash: false,
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args }, t) {
        const time = require("ms")(args[0]);
        const text = args[1] ?? "No text provided";
        const { channel } = message;
        setTimeout(() => {
            channel.send(`${text}`);
        }, time);
        message.reply(t("cmds:reminder.set"));
    }

    //eslint-disable-next-line no-unused-vars
    run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
