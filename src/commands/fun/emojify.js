/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "emojify",
                memberPerms: [],
                botPerms: [],
                requirements: {
                    args: true,
                },
                usage: "[text]",
                disabled: false,
                cooldown: 8,
                category: "Fun",
            },
            client
        );
    }

    execute({ message, args, guildDB }, t) {
        const specialChars = {
          '0': ':zero:',
          '1': ':one:',
          '2': ':two:',
          '3': ':three:',
          '4': ':four:',
          '5': ':five:',
          '6': ':six:',
          '7': ':seven:',
          '8': ':eight:',
          '9': ':nine:',
          '#': ':hash:',
          '*': ':asterisk:',
          '?': ':grey_question:',
          '!': ':grey_exclamation:',
          ' ': '   ',
        };
      
      const emojified = `${args.join(" ")}`.toLowerCase().split("").map(l => {
            if (/[a-z]/g.test(l)) {
                return `:regional_indicator_${l}: `;
            } else if (specialChars[l]) {
                return `${specialChars[l]} `;
            }
            return l;
        }).join("");

        if (emojified.length > 2000) {
            return message.channel.send(`:x: ${t("errors:msgBig", {name: "emojified"})}`);
        }

        message.channel.send(emojified);
    }
};
