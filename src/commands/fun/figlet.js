/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "figlet",
                aliases: ["asciify", "bigtext"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                usage: "[string]",
                disabled: false,
                cooldown: 10,
                category: "Fun",
            },
            client
        );
    }

    async execute({ message, args }, t) {
        const figlet = require("figlet");
        const figletAsync = require("util").promisify(figlet);
        let text = args.join(" ");
        let result;
        if (text.length > 20) {
            return message.channel.send(
                "Your text has to be smaller than 20 characters"
            );
        }
        result = await figletAsync(text);
        message.channel.send("```" + result + "```");
    }
};
