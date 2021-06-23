/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "sample",
    aliases: ["example"],
    description: "desc",
    permissions: [],
    bot_perms: [],
    args: false,
    guildOnly: true,
    catchError: true,
    usage: "[arg1] (arg2)",
    disabled: false,
    subcommand: false,
    subcommands: [{name:"set", desc:"Set this"}, {name:"reset", desc:"Reset that"}],
    cooldown: 10,
    ownerOnly: false,
    category: "Sample",
    execute(message, args, guildDB) {
        return;
    },
};
