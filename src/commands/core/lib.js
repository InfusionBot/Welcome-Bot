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
                name: "lib",
                aliases: ["library"],
                memberPerms: [],
                botPerms: [],
                disabled: false,
                cooldown: 10,
                category: "Core",
            },
            client
        );
    }

    //eslint-disable-next-line no-unused-vars
    execute({ message, args }, t) {
        //TODO: Add translation
        const embed = new Embed()
            .setTitle(t("misc:djsv"))
            .setURL("https://discord.js.org");
        return message.reply({ embeds: [embed] });
    }
};
