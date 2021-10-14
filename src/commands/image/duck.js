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
                name: "duck",
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 5,
                category: "Image",
            },
            client
        );
    }

    async execute({ message } /*, t*/) {
        const res = await this.fetchJson("https://random-d.uk/api/v1/random");
        const embed = new Embed().setImage(res.url);
        message.reply({ embeds: [embed] });
    }
};
