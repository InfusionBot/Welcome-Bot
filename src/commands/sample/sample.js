/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "sample", //Command name, Required
    aliases: ["example"], //Aliases for that command, Optional
    description: "desc", //Description of that command, Optional
    permissions: [], //Permissions required by a member/user to execute this command, Optional
    bot_perms: [], //Permissions required by bot to execute this command, Optional
    args: false, //Is at least 1 argument required? Optional
    guildOnly: true, //Should we only execute this command in guilds and not DMs? Optional
    catchError: false, //Do you want to catch error, log it and reply that there was an error? Optional
    usage: "[arg1] (arg2)", //How to use this command? Optional. Here arg1 is required and arg2 is optional based on the brakets used.
    disabled: true, //Is this command disabled? Optional
    subcommand: false, //Is at least 1 subcommand required? Optional
    subcommands: ["set", "get", "reset"], //What subcommands does this command have? Optional
    cooldown: 10, //Minimum time required to execute the same command again, Optional (default: 3)
    ownerOnly: true, //Can only the owner(s) of this bot execute this command, Optional
    execute(message, args) {
        //The function to execute the command, Required
        return;
    },
};
