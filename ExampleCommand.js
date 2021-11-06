/**
 * InfusionBot
 * Copyright (c) 2021 The InfusionBot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
//eslint-disable-next-line no-unused-vars
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "sample",
                aliases: ["example"],
                memberPerms: [],
                botPerms: [],
                requirements: {
                    subcommand: false,
                    args: false,
                    guildOnly: true,
                    ownerOnly: false,
                },
                disabled: false,
                subcommands: [{ name: "set", desc: "Set this" }],
                cooldown: 5,
                category: "General",
                slash: false,
            },
            client
        );
    }

    execute({ message, args, guildDB, userDB }, t) {
        return;
    }

    async run({ interaction, guildDB, userDB }, t) {
        return;
    }
};
