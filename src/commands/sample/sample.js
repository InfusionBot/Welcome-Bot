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
    catchError: false,
    usage: "[arg1] (arg2)",
    disabled: true,
    subcommand: false,
    subcommands: ["set", "get", "reset"],
    cooldown: 10,
    ownerOnly: true,
    execute(message, args) {
        return;
    },
};
