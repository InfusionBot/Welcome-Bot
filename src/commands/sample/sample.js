/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
module.exports = {
    name: "sample", //Command name, Required
    aliases: ["example"], //Aliases for that command, Optional
    description: "desc", //Description of that command, Optional
    permissions: [], //Permissions required by a member to execute this command
    args: false, //Is at least 1 argument required? Optional
    disabled: true, //Is this command disabled? Optional
    subcommand: false, //Is at least 1 subcommand required? Optional
    subcommands: ["set", "get", "reset"], //What subcommands does this command have? Optional
    execute(message, args) {
        //The function to execute the command, Required
        return;
    },
};
