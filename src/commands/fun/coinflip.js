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
                name: "coinflip",
                aliases: ["cf", "filpcoin"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Fun",
            },
            client
        );
    }

    execute({ message, args }, t) {
        const coins = {
            heads: "https://i.imgur.com/yStXPCV.png",
            tails: "https://i.imgur.com/kSteyPc.png",
        };
        const sides = ["heads", "tails"];
        const chosenSide = sides[Math.floor(Math.random() * sides.length)];
        const embed = new Embed()
            .setImage(coins[chosenSide])
            .setDescription(t("cmds:coinflip.done", chosenSide));
        message.channel.send({ embeds: [embed] });
    }
};
