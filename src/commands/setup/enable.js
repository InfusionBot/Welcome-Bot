/**
 * Discord Welcome bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const { Permissions } = require("discord.js");
module.exports = {
    name: "enable",
    //description: "Enable welcome / goodbye logs.",
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    subcommand: true,
    subcommands: [
        { name: "welcome", desc: "Enable welcome logs" },
        { name: "goodbye", desc: "Enable goodBye logs" },
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
                updateGuild(message.guild.id, "enableWelcome", true);
                message.react("👍");
                break;
            case "goodbye":
                updateGuild(message.guild.id, "enableGoodbye", true);
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
                            `${guildDB.prefix}help enable`
                    );
                }
                break;
        }
        return;
    },
};
