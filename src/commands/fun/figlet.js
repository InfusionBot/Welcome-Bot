/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "figlet",
    aliases: ["asciify", "bigtext"],
    description: "Implement the FIGfont spec in JS",
    args: true,
    usage: "[string]",
    cooldown: 10,
    category: "Fun",
    async execute(message, args) {
        const figlet = require("figlet");
        const util = require("util");
        const figletAsync = util.promisify(figlet);
        let text = args.join(" ");
        let result;
        if (text.length > 20) {
            return message.channel.send(
                "Your text has to be smaller than 20 characters"
            );
        }
        result = await figletAsync(text);
        message.channel.send("```" + result + "```");
    },
};
