/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "disable",
    //description: "Disable welcome / goodbye logs.",
    permissions: [Permissions.FLAGS.MANAGE_SERVER],
    subcommand: true,
    subcommands: [
        { name: "welcome", desc: "Disable welcome logs" },
        { name: "goodbye", desc: "Disable goodBye logs" },
        { name: "show", desc: "Show current settings" },
    ],
    guildOnly: true,
    usage: "[subcommand]",
    cooldown: 10,
    category: "Setup",
    execute(message, args, guildDB) {
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
                return message.channel.send(
                    `Welcome logs are ${
                        guildDB.enableWelcome ? "enabled" : "disabled"
                    }\nAnd goodBye logs are ${
                        guildDB.enableGoodbye ? "enabled" : "disabled"
                    }`
                );
                break;
        }
        return;
    },
};
