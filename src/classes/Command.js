/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = class Command {
    constructor(client, command) {
        if (command.name !== command.name.toLowerCase()) {
            throw new TypeError("Command names must be lower case only");
            process.exit();
        }
        if (command.subcommands) {
            for (var i = 0; i < command.subcommands.length; i++) {
                if (
                    command.subcommands[i].name &&
                    !command.subcommands[i].desc
                ) {
                    throw new TypeError(
                        "If subcommands are provided then their description should also be provided\nDescription not provided for " +
                            command.subcommands[i].name
                    );
                    process.exit();
                }
            }
        }
        if (command.name.includes("-")) {
            command.aliases.push(command.name.replace(/-/g, ""));
        }
        if (command.aliases) {
            for (const alias of command.aliases) {
                if (alias.includes("-")) {
                    const alias2 = alias.replace(/-/g, "");
                    if (command.name !== alias2) command.aliases.push(alias2);
                }
            }
        }
        this.name = command.name;
        this.aliases = command.aliases || [];
        this.permissions = command.permissions || [];
        this.bot_perms = command.bot_perms || [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
        ];
        this.args = command.args || false;
        this.guildOnly = command.guildOnly || false;
        this.catchError = command.catchError || true;
        this.usage = command.usage || false;
        this.disabled = command.disabled || false;
        this.subcommand = command.subcommand || false;
        this.subcommands = command.subcommands || false;
        this.cooldown = command.cooldown;
        this.ownerOnly = command.ownerOnly;
        this.category = command.category;
        this.metadata = {
            guildOnly: command.guildOnly || false,
            cooldown: command.cooldown,
        };
        this.execute = command.execute;
        return command;
    }
};
