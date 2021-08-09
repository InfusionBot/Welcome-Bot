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
                name: "reverse",
                aliases: ["rs"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                disabled: false,
                cooldown: 10,
                category: "General",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args, guildDB, userDB }, t) {
        //const text = args.join(" ");
        //const reversed = text.split(" ").reverse().join(" ");
        const reversed = args.reverse().join(" ");
        message.reply(reversed);
    }
};
