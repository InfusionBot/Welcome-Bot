/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
const { Embed, Command } = require("../../classes");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "disable",
                memberPerms: [Permissions.FLAGS.MANAGE_GUILD],
                botPerms: [],
                requirements: {
                    subcommand: true,
                    guildOnly: true,
                },
                usage: "[subcommand]",
                subcommands: [
                    { name: "welcome", desc: "Disable welcome logs" },
                    { name: "goodbye", desc: "Disable goodBye logs" },
                    { name: "show", desc: "Show current settings" },
                ],
                disabled: false,
                cooldown: 10,
                category: "Setup",
            },
            client
        );
    }

    async execute({ message, args, guildDB }, t) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        args[0] = args[0] ? args[0] : "";
        switch (args[0].toLowerCase()) {
            case "welcome":
                updateGuild(message.guild.id, "enableWelcome", false);
                message.react("👍");
                break;
            case "goodbye":
                updateGuild(message.guild.id, "enableGoodbye", false);
                message.react("👍");
                break;
            default:
                if (!args.length) {
                    return message.channel.send(
                        `Welcome logs are ${
                            guildDB.enableWelcome ? "enabled" : "disabled"
                        }\nAnd goodBye logs are ${
                            guildDB.enableGoodbye ? "enabled" : "disabled"
                        }`
                    );
                } else {
                    message.reply(
                        t("cmds:channel.invalidArgs") +
                            `${guildDB.prefix}help disable`
                    );
                }
                break;
        }
        return;
    }
};
