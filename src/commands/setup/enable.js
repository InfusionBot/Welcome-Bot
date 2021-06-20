/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "enable",
    description:
        "Enable/Disable welcome and goodbye logs. Not providing any args will show current settings.",
    args: false,
    guildOnly: true,
    usage: "[true / false]",
    cooldown: 10,
    category: "Setup",
    execute(message, args, guildDB) {
        const updateGuild = require("../../db/functions/guild/updateGuild");
        args[0] = args[0] ? args[0] : "";
        switch (args[0]) {
            case "true":
                updateGuild(message.guild.id, "enableWelcome", true);
                message.react("👍");
                break;
            case "false":
                updateGuild(message.guild.id, "enableWelcome", false);
                message.react("👍");
                break;
            default:
                return message.channel.send(
                    `Welcome and goodBye logs are ${
                        guildDB.enableWelcome ? "enabled" : "disabled"
                    }`
                );
                break;
        }
        return;
    },
};
